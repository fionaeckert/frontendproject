
let playlist = []


//-----------------------------------------------------------------------------------------------------------------------------------------------
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

        //shuffle ()

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
const getGif = () =>{
    fetch('http://api.giphy.com/v1/gifs/random?api_key=M9xXufYZ27Bjma9Wumq9mijU45ruYRNP&tag=dog')
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