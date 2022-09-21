const express = require('express')
const dotenv = require('dotenv')
const JWT = require("jsonwebtoken")
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
let session = require('express-session')
const app = express()
const router = require("./router")
const repositoryUser = require('./repository/user')

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/uploads-attachment",express.static("uploads_attachment"))
app.use("/api",router)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: "867532391420-2udtbpr14q5vf7h44n5k4k5j21r3tn11.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: `${process.env.CLIENT_URL}/google/callback`
},

    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await repositoryUser.userByEmail(profile.emails[0].value)
        
            // if user exists return the user 
            if (existingUser) {
                return done(null, existingUser);
            }
            function User({username, email}){
                this.username = username;
                this.email = email;
            
            }
            // if user does not exist create a new user 
            const newUser = new User({
                username: profile.displayName,
                email: profile.emails[0].value
            });
           
            let obj = {}
            obj.first_name = profile.displayName
            obj.last_name = ""
            obj.email = profile.emails[0].value
            obj.password = ""
            obj.isActive = true
            obj.role = "user"
            obj.about = ""
            obj.photo = ""
    
            await repositoryUser.createUser(obj);

            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
    }
));

app.get('/', (req, res) => {
    res.status(200).json({
        "test": "ini test"
    })
})

app.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        try {
            const token = JWT.sign({
                id: req.user._id,
                isAdmin: req.user.isAdmin
            },
             process.env.JWT_SEC, 
            { expiresIn: "1d" })
            res.status(200).json({
                message: "Login Success",
                user:req.user,
                token:token
            })
        } catch(err) {
            console.log(err)
            return res.status(500).json({
                message:"error"
            })
        }
    })

app.listen(process.env.PORT , ()=> {
    console.log(`API run in PORT : ${process.env.PORT}`)
})