/**
* index.js
* This is your main app entry point
*/
/**
 * @desc Teacher's work
 */
// Set up express, bodyparser and EJS
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering
app.use(express.static(__dirname + '/public')); // set location of static files

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});

// Handle requests to the home page 
app.get('/', (req, res) => {
    res.render("index.ejs");
});

/**
 * @desc Student's work
 */
// Add all the route handlers in authorRoutes to the app under the path /author
const authorRoutes = require('./routes/authorMode');
app.use('/author', authorRoutes);

// Add all the route handlers in authorRoutes to the app under the path /author
const readerRoutes = require('./routes/readerMode');
app.use('/reader', readerRoutes);

// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

