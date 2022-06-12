// Setup empty JS object to act as endpoint for all routes
weather = {};

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

const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
const appData = {}

// app.get('/all', function (req, res) {
//     res.send(appData)
// })

// // Post Route
// const data = []
// app.post('/addMovie', function (req, res){
//     console.log(req.body)
//     data.push(req.body)
//     res.send({message: "Message from server via post API"})
// })

// Weather API
app.post('/getWeather', function (req, res){
    console.log(req.body)
    // data.push(req.body)

    if(req.body.zip === "") {
        res.send({message: "Please send valid ZIP code"})
    }

    if(req.body.zip !== "") {
      try{
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.zip}&limit=5&appid=8af8da93c536a6e913fb9ed73ea948d8`)
            .then(response => {
                if(response.data.length > 0) {
                    const lat = response.data[0].lat
                    const lon = response.data[0].lon
                    axios.get(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=8af8da93c536a6e913fb9ed73ea948d8`)
                    .then(output=> {

                            console.log('output', output)
                            const weather = {
                                temp: output.data.main.temp,
                                content: output.data.main.feels_like
                            }
                            res.send({weather: weather})

                        }
                    )


                }
            });
        } catch(err) {
            res.send(error)
        }

    } 
})
