const express = require('express')
const router = require('./routes')
const app = express()

app.use('/api/playlists/', router)

const PORT = 3000
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}/`))