const express = require('express')
const app = express()
const PORT = 3000
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const restream = async function (proxyReq, req, res, options) {
        if (
            req.headers['content-type'] &&
            req.headers['content-type'].match(/^multipart\/form-data/)
        ) {
            // build a string in multipart/form-data format with the data you need
            const formdataUser =
                `--${req.headers['content-type'].replace(/^.*boundary=(.*)$/, '$1')}\r\n` +
                `Content-Disposition: form-data; name="reqUser"\r\n` +
                `\r\n` +
                `${JSON.stringify(req.user)}\r\n`

            // set the new content length
            proxyReq.setHeader(
                'Content-Length',
                parseInt(req.headers['content-length']) + Buffer.byteLength(formdataUser)
            )

            proxyReq.write(formdataUser)
        } else {
            const body = JSON.stringify({ ...req.body, reqUser: req.user })
            proxyReq.setHeader('Content-Type', 'application/json')
            proxyReq.setHeader('Content-Length', Buffer.byteLength(body))
            proxyReq.write(body)
        }
    
}


app.use('/company', createProxyMiddleware({ target: 'http://localhost:4000/', pathRewrite: { '/company': '/' }, onProxyReq: restream }));

app.use('/users', createProxyMiddleware({ target: 'http://localhost:5000/', pathRewrite: { '/users': '/' }, onProxyReq: restream }));



app.listen(PORT, () => {
    console.log(`API run in PORT : ${PORT}`)
})