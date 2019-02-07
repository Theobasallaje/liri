var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
const command = process.argv[2];
const selection = process.argv.splice(3).join(" ");

var spotify = new Spotify({
    id: "a1a2532a8679426198646ae20386ab46",
    secret: "e339430b00d04c08b8ae697e678efefb"
  });
  
console.log(command);
console.log(selection);

if(command === "spotify-this"){
    console.log("you are in spotify");
    spotify.search({ type: 'track', query: selection }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       var base = data.tracks.items[0]
     
      console.log("Artists : " + base.artists[0].name);
      console.log("Song Name : " + base.name);
      console.log("Preview URL : " + base.preview_url);
      console.log("Album Name : " + base.album.name);
      });
} else if (command === "bands-in-town"){
    var url = "https://rest.bandsintown.com/artists/" + selection + "/events?app_id=codingbootcamp";
    console.log("you are in bands in town");
    axios.get(url).then(function(data){
        console.log(data.data[0].venue.name);
        console.log(data.data[0].venue.country);
        var date = moment(data.data[0].datetime).format("MM/DD/YYYY");
        console.log(date);
    })
}