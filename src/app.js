const express = require("express");
const { partials } = require("handlebars");
const app = express();
const path = require("path");
const hbs = require('hbs');

const geocode = require('../public/utils/geocode');
const forecast = require('../public/utils/forecast');

const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../public/views");
const partialsDirectory = path.join(__dirname, "../public/partials");
hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectory));

const port = process.env.PORT || 4000;
//app.com
//app.com/help
//app.com/about
app.set("view engine", "hbs");
app.set("views", viewsDirectory);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App.",
    name: 'Abhishek Ugale',
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: 'Abhishek Ugale',
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: 'Abhishek Ugale',
  });
});

app.get('/weather',(req,res)=>{
  console.log(req.query);
  if(!req.query.address)
  {
    res.send({error:'You must provide an address!'});
    return;
  }
  
  geocode(req.query.address, (error, data) => {
    if (error) {
      res.send({error});
    }
    forecast(
      {
        latitude: data.latitude,
        longitude: data.longitude,
        location: data.location,
      },
      (error, result) => {
        if (error) {
          res.send({error});
          return;
        }
        res.send(result);
      }
    );
  });
  

})


app.get('*',(req,res)=>{
  res.render('404',{
    title:'404 Error',
    errorMessage: 'Page not found',
    name:'Abhishek Ugale',
  })
})


app.listen(port, () => {
  console.log("Server is up and running on port "+port);
});
