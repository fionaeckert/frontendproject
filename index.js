gifsList = ['https://giphy.com/embed/rdAeOA3mfXomQ','https://giphy.com/embed/vhkPj5VZYuKKQ','https://giphy.com/embed/LWzdNsCaw2t2wdj0wp',
'https://giphy.com/embed/XY2K8EQ83uN3sLzeYT','https://giphy.com/embed/DirPxXrUHKaCA','https://giphy.com/embed/4Zo41lhzKt6iZ8xff9','https://giphy.com/embed/3lxD1O74siiz5FvrJs'
,'https://giphy.com/embed/xUOxfbuK9qc61NGiaI','https://giphy.com/embed/1kkxWqT5nvLXupUTwK','https://giphy.com/embed/l2uluGTvB7DAQvZyHp']
// gifs = []
dogFacts = []
playlist = []
songInfo = []
curIndex = 0
preIndex = curIndex - 1 
nexIndex = curIndex + 1
totalLength = 10
// test mp3 file 'http://cdn-preview-2.deezer.com/stream/c-24072e38c6cd825c7652d4b240d2b8cb-7.mp3'
// console.log(gifs)
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
            //getGif()
            }
        }
        // console.log(gifs)
        shuffle()
        getFacts()
        startPlaylist(curIndex)

    })
}
//-----------------------------------------------------
function startPlaylist(index) { 
    // console.log('in startPlaylist   ')
    sound = new Howl({
    src:[playlist[index]],
    volume: 0.1
})
    sound.play()
    console.log(songInfo[index])
    displaySong(songInfo[index])
    displayGif()
}
//-----------------------------------------------------
function playSong() {   
    if (sound.playing() == false)
        sound.play()
        // console.log('play song') 
}
//-----------------------------------------------------
function pauseSong() {
    sound.pause()
    // console.log('pause song')
}
//-----------------------------------------------------
function nextSong() {   
    if (nexIndex < playlist.length) {
    sound.stop()
    // console.log('next song')
    curIndex = nexIndex
    startPlaylist(nexIndex)
    nexIndex = curIndex + 1
    preIndex = curIndex - 1
    }
}
//-----------------------------------------------------
function prevSong() {  
    if (preIndex > -1) {
    sound.stop()
    // console.log('previous song')
    curIndex = preIndex
    startPlaylist(preIndex)
    nexIndex = curIndex + 1
    preIndex = curIndex - 1
    }
}

//-----------------------------------------------------
const displaySong = (song) => {
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
function shuffle() {
  let i = playlist.length
  let ri;
  while (i != 0) {
    ri = Math.floor(Math.random()*i);
    i--;

    [playlist[i], playlist[ri]] =  [playlist[ri], playlist[i]];
    [songInfo[i], songInfo[ri]] =  [songInfo[ri], songInfo[i]];
    [gifsList[i], gifsList[ri]] =  [gifsList[ri], gifsList[i]];
  }
//   gifs.splice(0,totalLength)
//   console.log(gifs)
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
const getGif = () => {
    fetch('http://127.0.0.1:8080/api.giphy.com/v1/gifs/random?api_key=H2vfGVbOk13pYN8yuRDLCdtRJwCsIEGc&tag=dog')
    .then(response => {
        return response.json()
    })
    .then(dogGif => {
        randomGif = dogGif.data.embed_url
        // console.log(randomGif)
        // gifs.push(randomGif)
    })
    }
//-----------------------------------------------------
function displayGif() {
    //console.log(gifsList[0])
    document.getElementById('gifSpot').src = gifsList[curIndex]
    //console.log(document.getElementById('gifSpot'))
}
//-----------------------------------------------------------------------------------------------------------------------------------------------
function getFacts() {
    fetch(' http://dog-api.kinduff.com/api/facts?number='+totalLength)
    .then(response => {
        return response.json()
    })
    .then(factO => {
        for(let i = 0; i > totalLength; i++) {
            dogFacts.push(factO.fact[i])
        }
    })
}
//-----------------------------------------------------
function displayFact() {
    document.getElementById('').innerText = dogFacts[curIndex]
}