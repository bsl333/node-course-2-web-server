// import express from "express";
const fs = require('fs')
const express = require('express')
const hbs = require('hbs')

const app = express()

// to render dynamically and use partials to reuse common html components using handlebars. 
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs') // key, value are params


// next tells middleware to move on (app continues to run)
app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}:${req.method} ${req.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log(err)
  })
  console.log(log)
  next()
})

// how to setup middleware to always render a maintenance page if site down.
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

// used if we put our html files in /public - can render statically
// .use is how you register middleware
app.use(express.static(__dirname + '/public'))

// Don't have to create new Date objs in each object passed to res.render
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

//handler for http get request
// req has header info, body info, etc
// res = response - decide what data to send back, HTTP status codes, etc. 
app.get('/', (req, res) => {
  // res.send('<h2>Hello Express!</h2>')
  // res.send({name: 'Branden', likes: ['basketball, traveling']})
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to my first instance of an express server running on port 3000',
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
})

app.get('/bad', (req, res) => {
  const returnMSg = {
    errorMessage: 'error in handling request'
  }
  res.send(returnMSg)
})
app.listen(3000, () => {
  console.log('server is up on port 3000')
})