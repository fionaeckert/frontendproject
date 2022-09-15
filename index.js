
playlist = []
songInfo = []
curIndex = 0
preIndex = curIndex - 1 
nexIndex = curIndex + 1

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
        for(let i = 0; i < 10; i++) {
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
        shuffle(playlist)
        shuffle(songInfo)
        //console.log('nest to start')
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
const getGif = () =>{
    fetch('http://api.giphy.com/v1/gifs/random?api_key=<>&tag=dog')
    .then(response => {
        return response.json()
    })
    .then(dogGif => {
        randomGif = dogGif.data.embed_url;
        document.getElementById('randomDogGif').src = randomGif;
        console.log(randomGif)
        console.log(document.getElementById('randomDogGif'.src))
    })
    }
//-----------------------------------------------------------------------------------------------------------------------------------------------