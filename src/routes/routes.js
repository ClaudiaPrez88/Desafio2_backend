const express = require('express');
const path = require('path');
const router = express.Router();
const { getSongs, addSong, editSong, deleteSong } = require('../controllers/songs.controllers');

// Ruta principal
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener todas las canciones
router.get('/canciones', getSongs);

// Ruta para agregar una nueva canción
router.post('/canciones', addSong);

// Ruta para editar una canción existente
router.put('/canciones/:id', editSong);

// Ruta para eliminar una canción
router.delete('/canciones/:id', deleteSong);

module.exports = router;
