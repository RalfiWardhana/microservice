
var pgp = require('pg-promise')({/*noWarnings: true*/});
const dotenv = require('dotenv')

dotenv.config()

const cn = {
  host: process.env.HOST,
  port: process.env.PORT_DB,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  max: 30 
};

var db = pgp(cn);


if (!db){
  console.log({message: 'Failed Connect, cek your connection'}); 
}else{
  console.log({message: 'database Connected'}); 
}


module.exports = db;
