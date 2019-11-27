const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Setting the view engine tells express
//which extension to assosicate with the
//template when calling res.render()
app.set('view engine', 'hbs');

//Setting up paths
app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(path.join(__dirname, '../partials'));

//ROUTES

//Root route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'boba fett'
    });
});

//About route
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About'
    });
});

//Help route
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help'
    });
});

//Weather route

/*
 Note that we are not RENDERING anything
 this function only returns a res.send to send JSON data
 back to the form's page. This is so we can display it
 dynamically without needing to go to a new page
*/
app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send("Error, no address");
    } 

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send(error);
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

//404 
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    });
});

//404
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    });
});

//Starting the server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});