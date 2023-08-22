const express = require('express') //Declare framework ExpressJS
const path = require('path') 
const handlebars = require('express-handlebars') //Declare view engine
const app = express() //Declare express object
const router = require('./router') //Catch links on the web

app.use(express.static(path.join(__dirname, 'public'))) //Set path to use folders, files in public folder
app.use(express.json()) //Allow JSON format
app.use(express.urlencoded({ extended: true }))

app.use('/', router) //Catch links and handle on the website

//Set view engine
app.engine('hbs',
    handlebars.engine({
        extname: 'hbs', //Set extenstion name is hbs
        defaultLayout: 'main',
    })
)
app.set('view engine', 'hbs')

//Set layout is views folder path
app.set('views', path.join(__dirname, 'views'))

//Config path (port and host) to run the project
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

//Start project
app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`)
})