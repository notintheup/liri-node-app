require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require('fs');
// var inquirer = require("inquirer");


var search = process.argv[2];
var enterRequest = process.argv.slice(3).join(" ");
var divider = "\n------------------------------------------------------------\n\n";


function switchCase() {

  switch (search) {

    case 'concert-this':
      bandsInTown(enterRequest);
      break;

    case 'spotify-this-song':
      songInfo(enterRequest);
      break;

    case 'movie-this':
      movieInfo(enterRequest);
      break;

    case 'do-what-it-says':
      getRandom();
      break;
  }
};



//**SPOTIFY**
function songInfo(enterRequest) {
  var spotify = new Spotify(keys.spotify);

  var searchSong;
  if (enterRequest === undefined) {
    searchSong = "Hips don't lie";
  } else {
    searchSong = enterRequest;
  };
  spotify.search(searchSong).then(
    function (response) {
      console.log(` ${divider}
      ${response}
      ${divider}`)
      
    })
}

//   spotify.search({
//     type: 'track',
//     query: searchTrack
//   }, function (error, data) {
//     if (error) {
//       console.log('Error: ' + error);
//       return;
//     } else {
//       console.log(divider);
//       console.log("Artist: " + data.tracks.items[0].artists[0].name);
//       console.log("Song: " + data.tracks.items[0].name);
//       console.log("Preview: " + data.tracks.items[3].preview_url);
//       console.log("Album: " + data.tracks.items[0].album.name);
//       console.log(divider);

//     }
//   });
// };

// **OMDB**
function movieInfo(enterRequest) {
  var searchMovie;
  if (enterRequest === undefined) {
    searchMovie = "Sharknado";
  } else {
    searchMovie = enterRequest;
  };
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

switchCase();





// function bandsInTown(enterRequest) {

//   if (action === 'concert-this') {
//     var artist = "";
//     for (var i = 3; i < process.argv.length; i++) {
//       artist += process.argv[i];
//     }
//     console.log(artist);
//   } else {
//     artist = enterRequest;
//   }

//   var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

//   request(queryUrl, function (error, response, body) {

//     if (!error && response.statusCode === 200) {

//       var jsonData = JSON.parse(body);
//       for (i = 0; i < jsonData.length; i++) {
//         var dataTime = jsonData[i].datetime;
//         var month = dataTime.substring(5, 7);
//         var year = dataTime.substring(0, 4);
//         var day = dataTime.substring(8, 10);
//         var dateForm = month + "/" + day + "/" + year

//         console.log(divider);

//         console.log("Date: " + dateForm);
//         console.log("Name: " + jsonData[i].venue.name);
//         console.log("City: " + jsonData[i].venue.city);
//         if (jsonData[i].venue.region !== "") {
//           console.log("Country: " + jsonData[i].venue.region);
//         }
//         console.log("Country: " + jsonData[i].venue.country);
//         console.log(divider);
//       }
//     }
//   });
// }
