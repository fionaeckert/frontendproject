let gifs = ['https://media.giphy.com/media/rdAeOA3mfXomQ/giphy.gif',
'https://media.giphy.com/media/vhkPj5VZYuKKQ/giphy.gif',
'https://media.giphy.com/media/LWzdNsCaw2t2wdj0wp/giphy.gif',
'https://media.giphy.com/media/XY2K8EQ83uN3sLzeYT/giphy.gif',
'https://media.giphy.com/media/DirPxXrUHKaCA/giphy.gif',
'https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif',
'https://media.giphy.com/media/3lxD1O74siiz5FvrJs/giphy.gif',
'https://media.giphy.com/media/xUOxfbuK9qc61NGiaI/giphy.gif',
'https://media.giphy.com/media/1kkxWqT5nvLXupUTwK/giphy.gif',
'https://media.giphy.com/media/l2uluGTvB7DAQvZyHp/giphy.gif']

playlist = []
songInfo = []
curIndex = 0
preIndex = curIndex - 1 
nexIndex = curIndex + 1
totalLength = 10

// test mp3 file 'http://cdn-preview-2.deezer.com/stream/c-24072e38c6cd825c7652d4b240d2b8cb-7.mp3'
//-----------------------------------------------------------------------------------------------------------------------------------------------
const getSongs = () => {        // Creates an array of songs from the deezer api
    //console.log('1')
    fetch('http://127.0.0.1:8080/api.deezer.com/search?q=dog')
    .then(response => {
        //console.log('2')
        return response.json()
    })
    .then(songs => {
        //console.log('3')
        for(let i = 0; i < totalLength; i++) {
            let song = {
                title: songs.data[i].title,
                preview: songs.data[i].preview,
                picture: songs.data[i].picture,
                id: songs.data[i].id,
                artist: songs.data[i].artist.name,
                album: songs.data[i].album.title
            }

            songInfo.push(song)
            playlist.push(songs.data[i].preview)
        }
        //console.log(playlist)
        // getGif()
        shuffle(playlist)
        startPlaylist(curIndex)
    })
}
//-----------------------------------------------------
function startPlaylist(index) { 
    console.log('in startPlaylist   ')
    sound = new Howl({
    src:[playlist[index]],
    volume: 0.1
})
    sound.play()
    displaySong(songInfo[index])
    displayGif()
}
//-----------------------------------------------------
function playSong() {   
    if (sound.playing() == false)
        sound.play()
        console.log('play song') 
}
//-----------------------------------------------------
function pauseSong() {
    sound.pause()
    console.log('pause song')
}
//-----------------------------------------------------
function nextSong() {   
    if (nexIndex < playlist.length) {
    sound.stop()
    console.log('next song')
    startPlaylist(nexIndex)
    curIndex = nexIndex
    nexIndex = curIndex + 1
    preIndex = curIndex - 1
    }
    console.log(preIndex,curIndex,nexIndex)
}
//-----------------------------------------------------
function prevSong() {  
    if (preIndex > -1) {
    sound.stop()
    console.log('previous song')
    startPlaylist(preIndex)
    curIndex = preIndex
    nexIndex = curIndex + 1
    preIndex = curIndex - 1
    }
    console.log(preIndex,curIndex,nexIndex)
}

//-----------------------------------------------------
const displaySong = (song) => {
    document.getElementById('nowPlaying').innerText = 'Now Playing: ' + song.title + ':' + song.album + '\nBy: ' + song.artist
}
//-----------------------------------------------------
function songDone() { // checks to see if the song is done to play next song,  missing logic for out bounds error  (something like if curIndex > playlist.length don't run)
    startPlaylist(nexIndex)
    curIndex = nexIndex
    nexIndex = curIndex + 1
    preIndex = curIndex - 1
}
//-----------------------------------------------------
function shuffle(myList) {
  let i = myList.length
  let ri;
  while (i != 0) {
    ri = Math.floor(Math.random()*i);
    i--;

    [playlist[i], playlist[ri]] =  [playlist[ri], playlist[i]];
    [songInfo[i], songInfo[ri]] =  [songInfo[ri], songInfo[i]];
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------    
function gifShuffle(myList) {
  let i = myList.length
  let ri;
  while (i != 0) {
    ri = Math.floor(Math.random()*i);
    i--;

    [gifs[i], gifs[ri]] =  [gifs[ri], gifs[i]];
  }
}
  
//-----------------------------------------------------
const getGif = () => {
    fetch('http://api.giphy.com/v1/gifs/random?api_key=H2vfGVbOk13pYN8yuRDLCdtRJwCsIEGc&tag=dog')
    .then(response => {
        return response.json()
    })
    .then(dogGif => {
        for (let i = 0; i < totalLength; i++) {
            randomGif = dogGif.data[i].embed_url
            gifs.push(randomGif)
        }
        gifShuffle(gifs)
    })
}
//-----------------------------------------------------
function displayGif() {
    //console.log('in display gif')
    document.getElementById('gifSpot').src = gifs[curIndex]
}