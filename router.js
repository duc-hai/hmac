const express = require('express')
const router = express.Router()
const hmac = require('./hmac') //Call to file handle algorithm

//Declare hash function libraries
const md5 = require ('md5')
const sha256 = require ('sha256')
const sha1 = require ('sha1')
// const sha3 = require('sha3')  // using sha3 is similar to other hash functions, so in this case i will demo sha3 with nodejs crypto library available

router.get('/', (req, res) => {
    return res.render('home', {layout: false}) // Render layout of home page
})

router.post('/calculateHMAC', (req, res) => {
    //Categorize hash functions to pass arguments to functions correctly
    switch (req.body.hash) {
        case 'md5': 
            //Use req.body to get data from font end (by POST method) 
            return res.status(200).json({MAC: hmac.calculateHMAC(req.body.message, req.body.key, md5)})
        case 'sha1':
            return res.status(200).json({MAC: hmac.calculateHMAC(req.body.message, req.body.key, sha1)})
        case 'sha256':
            return res.status(200).json({MAC: hmac.calculateHMAC(req.body.message, req.body.key, sha256)})
        case 'sha3-256':
        case 'sha3-384':
        case 'sha3-512':
            // using sha3 is similar to other hash functions, so in this case i will demo sha3 with nodejs crypto library available
            return res.status(200).json({MAC: hmac.calculateHMACwithLibary(req.body.message, req.body.key, req.body.hash)})
        default: 
            return res.status(500).json({error: 'Can not find the hash function suitbale'})
    }
})

//Catch invalid links in the website to notify users
router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

//Export routes to use in main file (app.js)
module.exports = router;
