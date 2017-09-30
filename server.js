//node packages for express, body-parser, and method-override
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();
var port = 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

//setting the handlebar engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection;

//setting the mysql connection
if(process.env.JAWSDB_URL) {
   connection = mysql.createConnection(process.env.JAWSDB_URL);
 }
  else{
    connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mo2yfYq@",
    database: "burger_db"
});
}


//connecting the connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//GET to populate page
app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers", function(err, data) {
    if (err) {
      throw err;
    }
    res.render("index", { burgers: data });
  });
});


//POST to add new items to database
app.post("/", function(req, res) {
  connection.query("INSERT INTO burgers (burger) VALUES (?)", 
  	[req.body.burger], 
  	function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});

//Put method that updates the devour boolean from false to true
app.put("/:id", function(req, res) {
  connection.query("UPDATE burgers SET devour = 1 WHERE id = ?", [
    req.params.id
  ], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});

app.listen(port);