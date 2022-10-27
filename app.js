// const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const https = require("https");
// const { parseArgs } = require("util");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (reg, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const query = req.body.cityName
  const query_1 = query.slice(0, 1).toUpperCase()
  const query_2 = query.slice(1, query.length).toLowerCase()
  const queryDisplay = `${query_1}${query_2}`
  const apiKey = "";
  const units = "metric";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      //    console.log(weatherData);
      const object = {
        name: "Emmanuel",
        role: "Engineer",
        age: 36,
      };
      // console.log(JSON.stringify(object))
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const weatherIconId = weatherData.weather[0].icon;
      const weatherIconImage = `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`;

      // console.log(temp)
      // console.log(description)
      res.write(
        `<h1>The temperature at ${queryDisplay} today is ${temp} degrees. And there will be ${description} today.</h1>`
      );
      res.write(`<img src = "${weatherIconImage}" alt = "weather icon"/>`);
      res.send();
    });
  });
});

app.listen(port, (req, res) => {
  console.log(`Server running on port: ${port}`);
});
