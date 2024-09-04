const playlistsController = require('./controllers/playlistsController')
const express = require('express')
const router = express.Router()
router.use(express.json())

router.get('/', playlistsController.index)
router.get('/:id', playlistsController.show)

router.post('/', playlistsController.create)
router.post('/:id/musics', playlistsController.addMusic)

router.put('/:id', playlistsController.update)

router.delete('/:id', playlistsController.delete)
router.delete('/:playlistId/musics/:musicId', playlistsController.removeMusic)

module.exports = router