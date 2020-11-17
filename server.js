// Set up Express
var express = require("express");
var PORT = process.env.PORT || 3306;
var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set up Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);



// var orm = require("./config/orm.js");

// orm.selectAll(burgers, function(result){
// console.log(result);
// });

//orm.insertOne()

//orm.updateOne()







// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });