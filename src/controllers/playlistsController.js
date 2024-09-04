const playlists = [{
  id: 1,
  name: "Kendrick Lamar",
  tags: ["rap", "pop"],
  musics: [{
    id: 1,
    title: "Euphoria",
    author: "Kendrick Lamar",
    album: "none",
    year: "2024"
  }]
}]

function generateRandomID() {
  return Math.floor(Math.random() * 999999)
}


module.exports = {
  //GET /api/playlists
  index: (req, res) => {
    res.json(playlists)
  },

  //GET /api/playlsts/:id
  show: (req, res) => {
    const { id } = req.params
    const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)
    if (playlistIndex === -1) {
      return res.status(404).json({ message: "Playlist not found!" })
    }

    res.status(200).json(playlists[playlistIndex])
  },

  //POST /api/playlists
  create: (req, res) => {
    const { name, tags, musics } = req.body

    if (typeof name !== "string") {
      res.status(400).json({message: "name must be a string"})
    }
    if (!Array.isArray(tags)) {
      res.status(400).json({message: "tags must be a array"})
    }
    if (musics && !Array.isArray(musics)) {
      res.status(400).json({message: "musics must be a string"})
    } else {
      musics.forEach(music => {
        const id = generateRandomID()
        music.id = id
      });
    }


    const newPlaylist = {
      id: generateRandomID(),
      name,
      tags,
      musics: musics ?? []
    }
    playlists.push(newPlaylist)
    res.status(200).json(newPlaylist)
  },

  //PUT /api/playlists/:id
  update: (req, res) => {
    const { id } = req.params
    const { name, tags } = req.body


    const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)
    if (playlistIndex === -1) {
      return res.status(404).json({ message: "Playlist not found!" })
    }
    
    if (typeof name == 'string' || !name === playlists[playlistIndex].name) {
      playlists[playlistIndex].name = name
    }
    if (typeof tags !== 'undefined' && tags !== '' || !tags === playlists[playlistIndex].tags) {
      playlists[playlistIndex].tags = tags
    }

    res.json(playlists[playlistIndex])
  },

  //DELETE api/playlists/:id
  delete: (req, res) => {
    const { id } = req.params
    const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)
    if (playlistIndex === -1) {
      return res.status(404).json({ message: "Playlist not found!" })
    }
    
    playlists.splice(playlistIndex, 1)
    res.status(204).end()
  },

  //POST /api/playlists/:id/musics
  addMusic: (req, res) => {
    const { title, author, album, year } = req.body
    const { id } = req.params

    const playlist = playlists.find(pl => pl.id === +id)
    if (!playlist) return res.status(404).json({ message: 'playlist not found'})
      if (
        typeof title !== 'string' || typeof album !== 'string' ||
        typeof author !== 'string' || typeof year !== 'number'
      ) {
      return res.status(400).json({ message: 'invalid fields' })
    }

    const newMusic = {
      id: generateRandomID(),
      title,
      author,
      album,
      year
    }
    playlist.musics.push(newMusic)
    res.status(201).json(newMusic)
  },

  //DELETE /api/playlists/:playlistId/musics/:musicId
  removeMusic: (req, res) => {
    const { playlistId, musicId } = req.params

    const playlist = playlists.find(playlist => playlist.id === +playlistId)
    if (!playlist) {
      res.status(404).json({ message: 'playlist not found' })
    }

    const musicIndex = playlist.musics.find(music => music.id === +musicId)

    if (musicIndex === -1) {
      res.status(404).json({ message: 'music not found' })
    }

    playlist.musics.splice(musicIndex, 1)
    res.status(204).end()
  },
}
