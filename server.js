require('dotenv').config()
const  express = require("express")
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const { ppid } = require("process")
const PORT = process.env.PORT || 7000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')
const passport = require('passport')

//Database connection
const url = 'mongodb://localhost/grocerystore'

mongoose.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Database successfully!');
    }
});



//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
        mongoUrl: url
    }),
    cookie: {maxAge: 1000 * 60 * 60 * 24} //24 hours
}))

//Passport Config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(express.static('public'))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

//Global middlewares
app.use((req, res, next) => {
    res.locals.session = req.session
    
    next()
})
//  set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)



app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});
