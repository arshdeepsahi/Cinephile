var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    //When 'Enter' clicked on textfield in App.js (react) call node_js app with text as a parameter
    var searchedMovie = 'movie_here'
    //Make API Call with parameter
    var queryString = "http://omdbapi.com/?s=" + searchedMovie + "&apikey=11a56ba6";
    //Maybe do these on Frontend?
    //Add to array/list
    //Format JSON Data
    //Then display array/list on react app
    res.send(queryString);
});

module.exports = router;
