gifsList = ['https://giphy.com/embed/rdAeOA3mfXomQ','https://giphy.com/embed/vhkPj5VZYuKKQ','https://giphy.com/embed/LWzdNsCaw2t2wdj0wp',
'https://giphy.com/embed/XY2K8EQ83uN3sLzeYT','https://giphy.com/embed/DirPxXrUHKaCA','https://giphy.com/embed/4Zo41lhzKt6iZ8xff9','https://giphy.com/embed/3lxD1O74siiz5FvrJs'
,'https://giphy.com/embed/xUOxfbuK9qc61NGiaI','https://giphy.com/embed/1kkxWqT5nvLXupUTwK','https://giphy.com/embed/l2uluGTvB7DAQvZyHp','https://giphy.com/embed/VpysUTI25mTlK','https://giphy.com/embed/sy843WuhjhB5K',
'https://giphy.com/embed/ZZAyXQIewUut2','https://giphy.com/embed/k2Da0Uzaxo9xe','https://giphy.com/embed/QV9UsDlB2tpaQpCUGn','https://giphy.com/embed/AqbzK6uE645ibue8ZJ','https://giphy.com/embed/iOdDgwtioHQaNdAQvC','https://giphy.com/embed/ZZAyXQIewUut2',
'https://giphy.com/embed/TkBoNth0Ps3Vm','https://giphy.com/embed/oewr5qXiye6fm','https://giphy.com/embed/11lU2bLTOl26vC']
dogFacts = []
dogFact = ''
playlist = []
songInfo = []
curIndex = 0
preIndex = curIndex - 1 
nexIndex = curIndex + 1
totalLength = 20
//-----------------------------------------------------------------------------------------------------------------------------------------------
const getSongs = () => {        // Creates an array of songs from the deezer api
    fetch('http://127.0.0.1:8080/api.deezer.com/search?q=dog')
    .then(response => {
        return response.json()
    })
    .then(songs => {
        let songData = songs.data
        
        for(let i = 0; i < totalLength; i++)  {
            if (songData[i].explicit_lyrics == false) {
            let song = {
                title: songData[i].title,
                preview: songData[i].preview,
                picture: songData[i].picture,
                id: songData[i].id,
                artist: songData[i].artist.name,
                album: songData[i].album.title
            }
            songInfo.push(song)
            playlist.push(songData[i].preview)
            }
        }
        shuffle()
        startPlaylist(curIndex)

    })
}
//-----------------------------------------------------
function startPlaylist(index) { // sets up the JS library (Howler) and calls the functions defined below so that the facts, songs, and gifs display properly
    sound = new Howl({
    src:[playlist[index]],
    volume: 0.1
})
    sound.play()
    displaySong(songInfo[index])
    displayGif()
    getFacts()
}
//-----------------------------------------------------
function playSong() {   // plays the song when the "play" button is pushed
    if (sound.playing() == false)
        sound.play()
}
//-----------------------------------------------------
function pauseSong() { // pauses the song when "pause" button is pushed
    sound.pause()
}
//-----------------------------------------------------
function nextSong() {   // plays the next song when "next" button is pushed
    if (nexIndex < playlist.length) {
    sound.stop()
    curIndex = nexIndex
    startPlaylist(nexIndex)
    nexIndex = curIndex + 1
    preIndex = curIndex - 1
}
else if (nexIndex==playlist.length){ 
    console.log('inside else if')
    sound.stop()
    curIndex = 0
    startPlaylist(curIndex)
    nexIndex = curIndex + 1
    preIndex = curIndex - 1
}
}
//-----------------------------------------------------
function prevSong() {  // plays previous song when "previous" button is pushed
    if (preIndex > -1) {
    sound.stop()
    curIndex = preIndex
    startPlaylist(preIndex)
    nexIndex = curIndex + 1
    preIndex = curIndex - 1
    }
}

//-----------------------------------------------------
const displaySong = (song) => { // displays the current song in the playlist box
    document.getElementById('nowPlaying').innerText = 'Now Playing: ' + song.title + ' | ' + song.album + '\nBy: ' + song.artist
}
//-----------------------------------------------------
function songDone() { // checks to see if the song is done to play next song,  missing logic for out bounds error  (something like if curIndex > playlist.length don't run)
    startPlaylist(nexIndex)
    curIndex = nexIndex
    nexIndex = curIndex + 1
    preIndex = curIndex - 1
}
//-----------------------------------------------------
function shuffle() { //shuffles the list of songs called from our API
  let i = playlist.length
  let ri;
  while (i != 0) {
    ri = Math.floor(Math.random()*i);
    i--;

    [playlist[i], playlist[ri]] =  [playlist[ri], playlist[i]];
    [songInfo[i], songInfo[ri]] =  [songInfo[ri], songInfo[i]];
    [gifsList[i], gifsList[ri]] =  [gifsList[ri], gifsList[i]];
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
const getGif = () => { // was supposed to grab the gif from the giphy API
    fetch('http://127.0.0.1:8080/api.giphy.com/v1/gifs/random?api_key=H2vfGVbOk13pYN8yuRDLCdtRJwCsIEGc&tag=dog')
    .then(response => {
        return response.json()
    })
    .then(dogGif => {
        randomGif = dogGif.data.embed_url
    })
    }
//-----------------------------------------------------
function displayGif() { // places the gif within the HTML element
    document.getElementById('gifSpot').src = gifsList[curIndex]
}
//-----------------------------------------------------------------------------------------------------------------------------------------------
function getFacts() { // grabs random dog fact API and calls the display function defined below
    fetch(' http://dog-api.kinduff.com/api/facts')
    .then(response => {
        return response.json()
    })
    .then(factO => {
        dogFact = factO.facts[0]
        displayFact()
    })
}
//-----------------------------------------------------
function displayFact() { // creates the function which places the random dog fact inside the HTML element
    document.getElementById('dogFact').innerText = dogFact
}