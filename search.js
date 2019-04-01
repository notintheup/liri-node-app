var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");


var Search = function() {
  var divider = "\n------------------------------------------------------------\n\n";

  this.findShow = function(song) {
    var spotify = new Spotify(keys.spotify);

    var URL = "https://accounts.spotify.com/authorize" + song;
    console.log(response)
}