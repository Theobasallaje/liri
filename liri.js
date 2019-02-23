require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
const command = process.argv[2];
const selection = process.argv.slice(3).join(" ");
var movieName = process.argv.slice(3).join(" ");
var concertResponse;
var spotifyResponse;
var movieResponse;
// var doWhatResponse;

// var spotify = new Spotify({
//   id: "a1a2532a8679426198646ae20386ab46",
//   secret: "e339430b00d04c08b8ae697e678efefb"
// });

var spotify = new Spotify(keys.spotify);

// console.log(command);
// console.log(selection);

//functions
function spotifyCommand(selection) {
  spotify.search({ type: 'track', query: selection }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var base = data.tracks.items[0]

    // spotifyResponse = {
    //   artist: base.artists[0].name,
    //   songName: base.name,
    //   previewUrl: base.preview_url,
    //   albumName: base.album.name
    // }

    spotifyResponse = "//////////////////////RESULTS FROM SPOTIFY FOR " + selection.toLocaleUpperCase() + "/////////////////////\n"
      + "Artist(s) : " + base.artists[0].name + "\n"
      + "Song Name : " + base.name + "\n"
      + "Preview URL : " + base.preview_url + "\n"
      + "Album Name : " + base.album.name + "\n\n";

    console.log(spotifyResponse);
    writeToFile(spotifyResponse);

    // console.log("Artist(s) : " + base.artists[0].name);
    // console.log("Song Name : " + base.name);
    // console.log("Preview URL : " + base.preview_url);
    // console.log("Album Name : " + base.album.name);
  });
}

function writeToFile(commandResponse) {
  fs.appendFile("log.txt", commandResponse, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("No errors Writting the above response to log.tx, Check it out!");
    }
  });
}

if (command === "spotify-this-song") {
  spotifyCommand(selection);
} else if (command === "concert-this") {
  var url = "https://rest.bandsintown.com/artists/" + selection + "/events?app_id=codingbootcamp";
  // console.log("you are in concert-this");
  axios.get(url).then(function (data) {
    // console.log(data.data[0].venue.name);
    // console.log(data.data[0].venue.country);
    var date = moment(data.data[0].datetime).format("MM/DD/YYYY");
    // console.log(date);

    concertResponse = "//////////////////////RESULTS FROM BANDS IN TOWN FOR " + selection.toLocaleUpperCase() + "/////////////////////\n"
      + "Venue : " + data.data[0].venue.name + "\n"
      + "Country : " + data.data[0].venue.country + "\n"
      + "Date : " + date + "\n\n";

    console.log(concertResponse);
    writeToFile(concertResponse);
  })
} else if (command === "movie-this") {
  if (movieName === "") {
    movieName = "mr+nobody";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function (response) {
      // console.log("Title: " + response.data.Title);
      // console.log("Came out in: " + response.data.Year);
      // console.log("imdb rating: " + response.data.imdbRating);
      // console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
      // console.log("Produced in: " + response.data.Country);
      // console.log("Language: " + response.data.Language);
      // console.log("Plot: " + response.data.Plot);
      // console.log("Actors: " + response.data.Actors);

      movieResponse = "//////////////////////RESULTS FROM OMDB FOR " + movieName.toLocaleUpperCase() + "/////////////////////\n"
        + "Title : " + response.data.Title + "\n"
        + "Came out in : " + response.data.Year + "\n"
        + "imdb rating : " + response.data.imdbRating + "\n"
        + "Rotten Tomatoes : " + response.data.Ratings[1].Value + "\n"
        + "Produced in : " + response.data.Country + "\n"
        + "Language : " + response.data.Language + "\n"
        + "Plot : " + response.data.Plot + "\n"
        + "Actors : " + response.data.Actors + "\n\n";

      console.log(movieResponse);
      writeToFile(movieResponse);
    }
  );
} else if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return error;
    } else {
      data = data.split(" ");
      // console.log(data.slice(3).join(" "));
      spotifyCommand(data.slice(3).join(" "));
    }
  });
}





