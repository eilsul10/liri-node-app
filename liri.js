require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require('node-spotify-api');
const axios = require('axios')
const moment = require('moment')
 
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
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }
//     console.log(data); 
// });

// https://rest.bandsintown.com/artists/temptations/events?app_id=codingbootcamp

const command = process.argv[2]

if(command === 'concert-this') {
    searchArtist(process.argv[3])
}
if(command === 'spotify-this-song') {

}
if(command === 'movie-this') {

}
if(command === 'do-what-it-says') {

}

