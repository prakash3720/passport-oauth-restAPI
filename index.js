const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const cors=require('cors')
const passport=require('passport')
const session = require('express-session')

var sess = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}

const auth=require('./routes/auth')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

app.use(passport.initialize())
app.use(session(sess))
require('./config/passport')

app.use('/auth',auth)

app.listen(process.env.PORT||3000)