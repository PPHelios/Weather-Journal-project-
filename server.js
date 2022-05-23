// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Set server port
const port = 3000;
// Setup Server
const server = app.listen(port, listening);
// Callback to check server is running
function listening()
{
  console.log('server running');
  console.log(`running on localhost: ${port}`);
};
// Send projectData as response
app.get('/data', sendData)
function sendData(req, res)
{
  res.send(projectData)
}
// post to save the data in projectData
app.post('/data', addData)
function addData(req, res)
{
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.feeling = req.body.feeling;
  res.end();
  console.log(projectData)
}