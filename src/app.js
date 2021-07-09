const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
console.log(__dirname);

/*
Heroku provides the port number at process.env.PORT. (process.env is an environment variable). Locally this is not available and we provide a fallback value of 3000.
*/
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');

/* express expects all files in the 'views' folder of the root directory. For custom folder names, add the path as below. Not needed if using 'views' */
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
/*'set' allows you to set an express value. We have a key and a value. Using this (handlebars) we can use it to produce dynamic content.
express expects all of its views (in this case hbs) to live in a specific folder views in the root of the project */
hbs.registerPartials(partialsPath);


//Setup static directory to serve
app.use(express.static(publicDirPath));

//app.com
//app.com/help
//app.com/about
//express will detect json, or html and render it

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Sayantan Mukherjee'
    });
    /*
    instead of using send, we are using render, to use the hbs file. By default it looks inside a 'views' folder inside the root directory. hbs converts itself to html */
    /*
    render takes in the filename as the first argument, and an object as second argument containing values you want to pass into the hbs
    */
})

app.get('/weather', (request, response) => {
    //query string starts with ?, separatede by &
    if (!request.query.address) {
        //you can have only 1 response.send. hence the next one produces an error. so we need to return this one
        return response.send({
            error: 'You must provide an address'
        })
    }

    geocode.geocode(request.query.address, (error, { latitude, longitude, location} = {}) =>{
        if(error) {
            return response.send({error});
        }

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return response.send( { error});
            }

            response.send({
                forecast : forecastData,
                location,
                address : request.query.address
            })
        })
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        name: 'Sayantan Mukherjee'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Sayantan Mukherjee'
    });
});


app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Sayantan Mukherjee',
        errorMessage: 'Help article not found'
    })
})


//Page not found, 404 error
app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Sayantan Mukherjee',
        errorMessage: 'Page not Found'
    })
});



/*
common development port is 3000
common http port is 80
callback function is fired when the port is up and running
starting a server is an asynchronous process
*/
app.listen(port, () => {
    console.log('Server is running ' + port);
})

/*
Partials with handlebars: Allows us to create a little template which is part of a bigger webpage. These are usually ones which are reused across pages in your site, eg headers and footers
*/
