const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

// Ruta del archivo repertorio.json
const repertorioPath = path.join(__dirname, '../db/repertorio.json');
//path.join() función de Node.js y __dirname variable global en Node.js que representa el directorio actual del módulo

//Leer repertorio
const getRepertorio = () => {
    return JSON.parse(readFileSync(repertorioPath, 'utf8'));
}; //JSON.parse() función global de JavaScript para convertir cadena de texto en JSON


// Guardar repertorio
const saveRepertorio = (data) => {
    writeFileSync(repertorioPath, JSON.stringify(data, null, 2));
};//JSON.stringify convierte objeto JavaScript en JSON

// Obtener todas las canciones
const getSongs = (req, res) => {
    const repertorio = getRepertorio();
    res.json(repertorio);
};

// Agregar una nueva canción
const addSong = (req, res) => {
    const repertorio = getRepertorio();
    const newSong = req.body;
    console.log("Datos recibidos para agregar:", newSong);
    if (newSong && newSong.id && newSong.titulo) {
        repertorio.push(newSong);
        saveRepertorio(repertorio);
        res.status(201).json(newSong);
    } else {
        res.status(400).json({ message: 'Datos de canción inválidos' });
    }
};

//Editar canción existente
const editSong = (req, res) => {
    const repertorio = getRepertorio();
    const id = req.params.id;
    const updatedSong = req.body;
    console.log("Datos recibidos para editar:", updatedSong);
    const index = repertorio.findIndex(song => song.id == id);
    if (index !== -1) {
        repertorio[index] = updatedSong;
        saveRepertorio(repertorio);
        res.json(updatedSong);
    } else {
        res.status(404).json({ message: 'Canción no encontrada' });
    }
};

//Eliminar una canción
const deleteSong = (req, res) => {
    const repertorio = getRepertorio();
    const id = req.params.id;

    const index = repertorio.findIndex(song => song.id == id);
    if (index !== -1) {
        const deletedSong = repertorio.splice(index, 1);
        saveRepertorio(repertorio);
        res.json(deletedSong);
    } else {
        res.status(404).json({ message: 'Canción no encontrada' });
    }
};

module.exports = {
    getSongs,
    addSong,
    editSong,
    deleteSong
};
