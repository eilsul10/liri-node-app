require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require('node-spotify-api');
const axios = require('axios')
const moment = require('moment')
const fs = require('fs')
 
const spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

function searchArtist(artist) {
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then((response) => {
        for(let i = 0; i < response.data.length; ++i) {
            console.log('-------------------------------')
            const event = response.data[i]
            console.log(`Event venue name: ${event.venue.name}`)
            console.log(`Event city: ${event.venue.city}`)
            const eventDate = moment(event.datetime).format('MM/DD/YYYY')
            console.log(`Event date: ${eventDate}`)
        }
    })
}

// https://rest.bandsintown.com/artists/temptations/events?app_id=codingbootcamp

function spotifyThisSong(song) {
    if(!song) {
        song = 'The Sign'
    }
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        const song = data.tracks.items[0]
        for(let i = 0; i < song.artists.length; ++i) {
            console.log(`Artist: ${song.artists[0].name}`)
        }
        console.log(`Song name: ${song.name}`)
        console.log(`Preview url: ${song.preview_url}`)
        console.log(`Album: ${song.album.name}`)
    });

}


function parseCommand(command, arg) {
    if(command === 'concert-this') {
        searchArtist(arg)
    }
    if(command === 'spotify-this-song') {
        spotifyThisSong(arg)
    }
    if(command === 'movie-this') {

    }
    if(command === 'do-what-it-says') {
        fs.readFile("random.txt", "utf8", function(error, data) {
            const args = data.split(',')
            const parsedCommand = args[0]
            const arg = args[1]
            parseCommand(parsedCommand, arg)
        })
    }

}

const command = process.argv[2]
const arg = process.argv[3]
parseCommand(command, arg)