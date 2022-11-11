const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(res, req) {
  console.log( req.body.cityName);
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url =  "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey + "&units=" + unit + "&icon=10d";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temprature in " + query + " is" + temp + " degree celcius. </h1>");
      res.write("<p>The wheather is curruntely" + weatherDescription + " </p>");
      res.write("<img src= " + imageURL + ">");

      res.send();
    })
  })

});



app.listen(3000, function() {
  console.log("Server is running on port 3000.");

});
