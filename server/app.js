const express = require('express') 
const app = express()
const mongoose = require('mongoose')
const hbs = require('hbs')
const cookieparser = require('cookie-parser')

const dotenv = require('dotenv')
dotenv.config();


mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true})
const connect = mongoose.connection 
connect.on('open',()=>{
    console.log("conneted to Database");
})

app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({extended:false}))




let PORT = process.env.PORT ||3000 


//Importing Auth-Routes

const routingForSignup = require('./routes/signup');
app.use('/register',routingForSignup);

const routingForLogin = require('./routes/login'); 
app.use('/login',routingForLogin);

const routingForDashboard = require('./routes/dashboard');
app.use('/dashboard',routingForDashboard);

const verifyEmail = require('./routes/verifyEmail');
app.use('/verify-email',verifyEmail);

const emailVerifiedPage = require('./routes/emailVerifiedPage');
app.use('/email-verfied', emailVerifiedPage);

// const forgotPassword = require('./routes/forgetpasword');
// app.use('/forget-password',forgotPassword);


app.listen(PORT,()=>{
    console.log(`Server is Running ${PORT}`);
})





