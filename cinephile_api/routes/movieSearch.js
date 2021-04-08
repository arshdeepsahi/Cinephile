var express = require("express");
var app = express();
var request = require("request");


//When 'Enter' clicked on textfield in App.js (react) call node_js app with text as a parameter
//var searchedMovie = 

//Make API Call with parameter
var queryString = "http://omdbapi.com/?s=" + searchedMovie + "&apikey=11a56ba6";


//Maybe do these on Frontend?

//Add to array/list (or DB?)
//Format JSON Data
//Then display array/list on react app