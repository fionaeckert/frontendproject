
let playlist = []
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

// -----------------------------------------------------------------------------------------------------------------------------------------------
const getSongs = () => {        // Creates an array of songs from the deezer api
    fetch('http://127.0.0.1:8080/api.deezer.com/search?q=dog')
    .then(response => {
        return response.json()
    })
    .then(songs => {
        for(let i = 0; i < 1; i++) {
            
            let song = {
                title: songs.data[0].title,
                preview: songs.data[0].preview,
                picture: songs.data[0].picture,
                id: songs.data[0].id,
                artist: songs.data[0].artist.name,
                album: songs.data[0].album.title
            }

            playlist.push(song)
        }

        getGif()

        shuffle()

        for(let i = 0; i < playlist.length; i++){
            playSong(playlist[i])
        }
        
    })
}
//-----------------------------------------------------------------------------------------------------------------------------------------------
const playSong = (song) => {
    document.getElementById('nowPlaying').innerText = 'Now Playing: ' + song.title + ':' + song.album + '\nBy: ' + song.artist

    var sound = new Howl({
        src: [song.preview]
      });
      
    //   sound.play();
}

//-----------------------------------------------------------------------------------------------------------------------------------------------    
function gifShuffle(){
    let gifLength = gifs.length;
    let gifShuffleIndex;
    gifShuffleIndex = Math.floor(Math.random()*gifLength);
    let randomGif = document.getElementById('randomDogGif');
    randomGif.src = gifs[gifShuffleIndex]
}
//-----------------------------------------------------------------------------------------------------------------------------------------------