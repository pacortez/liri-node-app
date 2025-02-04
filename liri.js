//problems: only works with single search term.

require("dotenv").config();

var inquirer = require("inquirer");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var userCommand = process.argv[2];
var searchItem = process.argv[3];

var concertThis = function() {
  axios.get("https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp")
  .then(function(response) {
      var d = new Date(response.data[0].datetime);
      var n = d.toLocaleDateString();
      console.log("+++++++++++++++++" +
      "\nBand: " + searchItem +
      "\nVenue name: " + response.data[0].venue.name +
      "\nCity: " + response.data[0].venue.city +
      "\nState: " + response.data[0].venue.region +
      "\nDate: " + n +
      "\n+++++++++++++++++")
  })
}
  
var spotifyThisSong = function () {
  if (searchItem === undefined) {
    searchItem = "The Sign by Ace of Base";
  }
  spotify
  .search({ type: 'track', query: searchItem, limit: 2})
  .then(function(response) {
    // console.log(response.tracks.items[0].album.artists[0].external_urls);
    console.log("+++++++++++++++++" +
    "\nArtist: " + response.tracks.items[0].album.artists[0].name +
    "\nSong: " + searchItem + 
    "\nPreview link: " + response.tracks.items[0].album.preview_url +
    "\nOpen link: " + response.tracks.items[0].album.external_urls.spotify +
    "\nAlbum: " + response.tracks.items[0].album.name +
    "\n+++++++++++++++++")
  })
  .catch(function(err) {
    console.log(err);
  });
}


var movieThis = function() {
  if (searchItem === undefined) {
    searchItem = "Mr. Nobody";
  }
  axios.get("http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy")
  .then(function(response) {
      console.log("=========================" +
      "\nMovie title: " + response.data.Title + 
      "\nYear: " + response.data.Year + 
      "\nRating: " + response.data.imdbRating +
      "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + 
      "\nCountry where produced: " + response.data.Country + 
      "\nLanguage: " + response.data.Language +
      "\nPlot: " + response.data.Plot + 
      "\nActors: " + response.data.Actors +
      "\n=========================")
  })
  }


//    * `concert-this`

if (userCommand === "concert-this") {
  concertThis();
} 

//    * `spotify-this-song`

else if (userCommand === "spotify-this-song") {
  // console.log("spotifyThisSong()")
  spotifyThisSong();
}

//    * `movie-this`

else if (userCommand === "movie-this") {
  // console.log("movieThis()")
  movieThis();
}

//    * `do-what-it-says`
else if (userCommand === "do-what-it-says") {
  console.log("doWhatItSays()")
}

else {
  console.log("not an acceptable command")
}











//use inquirer to give the user an option of what they want to do
// inquirer.prompt([
//   {
//     type: "list",
//     name: "command",
//     message: "What do you want to do?",
//     choices: ["Find a concert", "Find info about a song", "Find info about a movie", "Something random"]
//   } 
// ]).then(function(inquirerResponse) {
  
//   if (inquirerResponse.command === "Find a concert") {
//     console.log("Searching concert")
//     concertThis();
//   }
//   else if (inquirerResponse.command === "Find info about a song") {
//     console.log("Info about a song")
//   }
//   else if (inquirerResponse.command === "Find info about a movie") {
//     console.log("Movie info")
//   }
//   else {
//     console.log("console Something random")
//   }
// })


// ????
