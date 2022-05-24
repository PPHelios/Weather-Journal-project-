/* Global Variables */
// OpenWeatherApi configuration
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',&appid=401412172d49fdd5026bb72d8049fe31&units=metric&units=metric';
// HTML element to listen for click events
const button = document.getElementById('generate');
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
// Retrieve the weather data from OpenWeather
const getTemp = async (baseUrl, zip, apiKey) =>
{
  const fullUrl = `${baseUrl}${zip}${apiKey}`;
  const response = await fetch(fullUrl)
  const weather = await response.json();
  return weather;
}
// Post data function
const sendData = async (path, data = {}) =>
{
  await fetch(path,
  {
    method: 'POST',
    credentials: 'same-origin',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
}
// User interface update function
const uiUpdate = async () =>
{
  const req = await fetch('/data');
// Use try/catch to handle the error
  try
  {
    const updatedDate = document.getElementById('date');
    const updatedTemp = document.getElementById('temp');
    const updatedContent = document.getElementById('content');
// Transform into JSON   
    const reply = await req.json();
// Write updated data to DOM elements        
    updatedDate.innerHTML = reply.date;
    updatedTemp.innerHTML = Math.round(reply.temp) + `\u00B0C`;
    updatedContent.innerHTML = reply.feeling;
  }
  catch (error)
  {
    console.log(error);   
  }
}
// On Click Event listener
button.addEventListener('click', inputData);
// On Click function
function inputData(e)
{
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getTemp(baseUrl, zip, apiKey)
// Using promises
    .then(function(weather)
    {
      const tempC = weather.main.temp;
      sendData('/data',
      {
        temp: tempC,
        date: newDate,
        feeling: feelings,
      })
      uiUpdate();
    })
}
