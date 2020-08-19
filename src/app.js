const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const PublicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(PublicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Dormammu69",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Horobiry",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Somebody help me!!!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Location must be provided",
    }); 
  }

  let location = req.query.address;

  forecast(location, (error, forecastData) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      forecast: forecastData,
      location,
      address: req.query.address,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term ",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help not here",
    name: "kakakakaka",
    errorMsg: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    name: " kakakaka",
    errorMsg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
