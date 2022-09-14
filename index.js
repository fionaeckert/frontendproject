
const getSongs = () => {
    fetch('https://api.deezer.com/search?q=dog')
    .then(response => {
        return response.json()
    })
    .then(song => {
        title = song.title
        preview = song.preview
        picture = song.picture
        id = song.id
        artist = song.artist.name
        album = song.album.title

        
    })
}



const getGif = () =>{
    fetch('')
}