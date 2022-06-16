// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Express to run server and routes
//express js is used to create API 
const express = require('express');

// Start up an instance of app
//calling express here,
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Include axios
//axios is to used hit api and get data from api response
const axios = require('axios')

// Initialize the main project folder

app.use(express.static('website'));
const port = 3000;

// Spin up (turn-on)the server

const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })

// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
const appData = {}

// app.get('/all', function (req, res) {
//     res.send(appData)
// })

// // Post Route
// const data = []
app.get('/weatherHistory', function (req, res){
//     console.log(req.body)
//     data.push(req.body)
     res.send({projectData:projectData})
     
 })

// Weather API creation
//req contains data received, res is used to send data backend to frontend 
app.post('/getWeather', function (req, res) {
    //console.log(req.body)
    // data.push(req.body)
    //console.log(req.body.temp)
    if (req.body.temp !== '') {
        projectData.push(req.body);
        console.log(projectData)
        res.send({ message: "Message from server via post API" })

    }
})
