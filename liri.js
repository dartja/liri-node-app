//requires npm packages from twitter, spotify, omdb, fs
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var keys = require('./keys.js');
var fs = require("fs");

//These variables processes action (arg1) and user input (arg2)
var action = process.argv[2];
var input = process.argv[3];

//Switch statement in place of if/then for either twitter, spotify, omdb, fs commands
switch (action) {
  case "my-tweets":
    myTweets();
    break;

   case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}
//Command Line: my-tweets to show my last 20 tweets on twitter
function myTweets(){
    //this variable will access my twitter account 
    var keys = require('./keys.js');

    //this variable calls the info from keys.js
    var client = new Twitter({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret
    });

    //shows last 20 tweets
    var params = {q: "dart321", count: 20};

        client.get('statuses/user_timeline', params, function(error, tweets, response){
          if (!error) {
               for (var i = 0; i < tweets.length; i++) {
                    console.log(" ------------------------------------------ ");
                    console.log(tweets[i].text);
                    console.log("Posted on: " + tweets[i].created_at);
               }
          } else {
               console.log(error);
          }
     });
}

//Command Line: spotify-this-song "song name here" will return song name, link on spotify, album of song
function spotifyThisSong(){
    //Query the default song to "The Sign" by Ace of Base if no song entered
    songName = "The Sign (Ace of Base)";

    //if user enters a song name it will query spotify.search
    if(input != undefined){
        songName = input;
    }
    spotify.search({type: 'track', query: songName}, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        //This will print, Artist Name, Song Name, URL on Spotify and Album Title.
        console.log(" --------- Spotify Music Info ------------- ");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Spotify Song URL: " + data.tracks.items[0].preview_url);
        console.log("Album Title: " + data.tracks.items[0].album.name)
        console.log(" ------------------------------------------ ");
    });

}

//Command Line: movie-this "movie name here" will return movie name, movie title,  
//year of movie, IMDB rating, country, language, plot, actors, rotten tomatoes rating and url
function movieThis(){
    //Default movie is "Mr. Nobody" if no movie entered
    movieName = "Mr. Nobody";

     //if user enters a movie name it will request and return from omdb
     if (input !== undefined) {
          movieName = input;
     }
     request('http://www.omdbapi.com/?t=' + movieName + "&tomatoes=true", function (error, response, body) {
          if (!error && response.statusCode == 200) {
               var movieData = JSON.parse(body);
               console.log(" ----------- OMDB Movie Info ------------- ");
               console.log("Title: " + movieData.Title);
               console.log("Year: " + movieData.Year);
               console.log("IMDB Rating: " + movieData.imdbRating);
               console.log("Country: " + movieData.Country);
               console.log("Language: " + movieData.Language);
               console.log("Plot: " + movieData.Plot);
               console.log("Actors: " + movieData.Actors);
               console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
               console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);
               console.log(" -------------------------------------------- ");
          }
          else {
               console.log(error);
          }
     });
}
//Command Line: do-what-it-says will return text from random.txt text file 
function doWhatItSays() {
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error){
            console.log(error);
        }
        else {
            var query = data;
            console.log(data);
        }
    });
    
}