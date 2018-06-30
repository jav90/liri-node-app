require("dotenv").config();

var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require("fs");


var command = process.argv[2];
var instruction = process.argv[3];

if(process.argv.length > 3){
    for(let i = 4; i < process.argv.length; i++){
        instruction = instruction + " " +process.argv[i];
    }
}

switch(command){
    
}

function twitter(){
    
    var tuit = new Twitter(keys.twitter);
    
    var options = {screen_name: 'javloz90', count: 3 };
    
    tuit.get('statuses/user_timeline',options, function(err, data){
        //console.log(data);
        for (var i = 0; i < data.length ; i++) {
            console.log(data[i].text);
        }
    });
}

function spotify(){
    //console.log(instruction);
    
    var song = new Spotify(keys.spotify);
    song.search({ 
        type: 'track', query: instruction 
    }).then(function(response) {
        let artists = response.tracks.items[0].artists;
        console.log(artists.name);
        console.log("Artist: " + response.tracks.items[0].artists.name);
        console.log("Song: " + response.tracks.items[0].name);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("Preview: " + response.tracks.items[0].preview_url);
    })
    .catch(function(err) {
        console.log(err);
    });
}

function imdb(){
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + instruction + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    //console.log(queryUrl);


    // Then create a request to the queryUrl
    request(queryUrl, function(error, response, body) {
        //console.log(JSON.stringify(body, null, 2));
        
        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Then log the Release Year for the movie
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

function random(){
    var dataArr;
    var dataArr2;
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        dataArr = data.split("\r\n"); 
        console.log(dataArr);
    
        dataArr2 = dataArr[Math.floor(Math.random() * dataArr.length)].split(",");
        console.log(dataArr2);
        instruction = dataArr2[1];
        switch (dataArr[0]){
            case "my-tweets":
                twitter();
            break;
            case "spotify-this-song":
                spotify();
            break;
            case "movie-this":
                imdb();
            break;
            default:
            break;
        }
    });
    


}