require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var search = process.argv[2];
var enterRequest = process.argv.slice(3).join(" ");
var divider = "\n------------------------------------------------------------\n\n";

function switchUp() {

  switch (search) {
    case 'concert-this':
      bandsInfo(enterRequest);
      break;
    case 'spotify-this-song':
      spotSong(enterRequest);
      break;
    case 'movie-this':
      movieInfo(enterRequest);
      break;
    case 'do-what-it-says':
      doWhat();
      break;
    default:
      console.log("Sorry! Try one of these commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
  }
};
// **bandsInTown**
function bandsInfo(enterRequest) {
  var searchBand = enterRequest;
  if (!searchBand) {
    searchBand = "Korn";
  } else {
    searchBand = searchBand;
  }
  axios.get("https://rest.bandsintown.com/artists/" + searchBand + "/events?app_id=codingbootcamp").then(
    function (response) {
      var response = (response.data)
      if (response.length > 0) {
        for (i = 0; i < 1; i++) {
          var concertDate = moment(response[i].datetime).format("MM/DD/YYYY hh:mm A");
          console.log(`
          Artist: ${response[i].lineup[0]}
          Venue: ${response[i].venue.name}
          Venue Location: ${response[i].venue.latitude}, ${response[i].venue.longitude}
          Venue City: ${response[i].venue.city}, ${response[i].venue.country}
          Concert Date: ${concertDate}`)
        };
      } else {
        console.log('Band or concert not found!');
      };
    })
}
// **spotify**
function spotSong(enterRequest) {
  var searchTrack;
  if (!enterRequest) {
    searchTrack = "The Sign ace of base";
  } else {
    searchTrack = enterRequest;
  }

  spotify.search({
    type: 'track',
    query: searchTrack
  }, function (error, data) {
    if (error) {
      console.log('Error occurred: ' + error);
      return;
    } else {
      console.log(` ${divider}
      ${data.tracks.items[0].artists[0].name}
      ${data.tracks.items[0].name}
      ${data.tracks.items[0].preview_url}
      ${data.tracks.items[0].album.name}
      ${divider}`)
    }
  });
};
// **OMDB**
function movieInfo(enterRequest) {
  var searchMovie;
  if (!enterRequest) {
    searchMovie = "Sharknado";
  } else {
    searchMovie = enterRequest;
  }
  axios.get("http://www.omdbapi.com/?t=" + searchMovie + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      console.log(` ${divider}
      Movie Title ${response.data.Title}
      Movie Year ${response.data.Year}
      The movie's rating is: " + ${response.data.imdbRating}
      Country: ${response.data.Country}
      Language: ${response.data.Language}
      Movie plot: ${response.data.Plot}
      Actors listed: ${response.data.Actors}
      ${divider}`)
    })
}

function doWhat() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      console.log(error);
    } else {
      data = data.split(',');
      command = data[0];
      if (command === 'spotify-this-song') {
        spotSong(data[1]);
      } else if (command === 'movie-this') {
        movieInfo(data[1]);
      } else if (command === 'concert-this') {
        bandsInfo();
      } else {
        console.log('Error: Unrecognized command.');
      }
    }
  });
}
switchUp();