const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engine and views location
app.set('views', viewsPath) // this is used to customize the folder, from which the hbs-files are fetched instead of the default folder views
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Christopher'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please insert an address!'
        })
    }
    geocode (req.query.address, 'AT', (error, {longitude, latitude} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Christopher'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Christopher'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Help article not found',
        name: 'Christopher'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Page not found',
        name: 'Christopher'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + ".")
})