// import express from 'express'
const express = require('express')
const app = express();//using app for express, i have put this here for easy access
// import { connect, connection } from 'mongoose'
const {connect, connection} = require('mongoose');
const PORT = 3001;
// import morgan from 'morgan'
const morgan = require('morgan');
// import { urlencoded, json } from 'body-parser'
const {urlencoded, json} = require('body-parser');

// import UserRoute from './routes/user' //dont import using ES6 modules
// const UserRoute = require('./routes/user');(custom module) use commonJS module if it has correct name given otherwise you will get the error cannot find module


try {
    //'mongodb://localhost:27017/testdb' i suggest u use atlas, either way you will be doing the same thing in an easy way even i havent use the local 27017, it was failing, u can get back to it later
    connect('mongodb+srv://johnwawandera:wanderaelite38@cluster1.hxwsk.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        // useFindAndModify: false, use this to create an error and see if your error handlers are working
        useUnifiedTopology: true
    }).then(()=>{
        app.get('/', (req, res)=>{
            res.send('hello world');
        })
    })

//ensuring a connection is established to database, if it fails, throws a database error, notice db.once and not db.on
const db = connection
db.once('error',(err) => {
    console.error(`connection fail => ${err}`)
})
db.once('open',() => {
    console.log('Database Connection Established!')
})

//nothin changed to your routes
app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

// const PORT = process.env.PORT || 5001 u can still use this
app.use('api/user', UserRoute) //looks like you were trying to access an end point that u have just imported to this file, e.g localhost:3001/api/user
    
} catch (error) {
    console.error(`error occured here ${error}`); //still will catch any error that might occure in the course of code execution
}


app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)}) //last line of code, check the backticks