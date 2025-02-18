const { Router } = require('express');
const timeout = require('connect-timeout');
require('dotenv').config(); // Load environment variables from .env

const usuarioController = require('../controllers/usuario.controller');
const arriendoController = require('../controllers/arriendo.controller');
const personaController = require('../controllers/persona.controller');
const propiedadController = require('../controllers/propiedad.controller');

const router = Router();
const timeoutDuration = process.env.TIMEOUT || '5s'; // Default to 5s if not set

// Rutas para test
router.get('/test', (req, res) => {
    console.log("test")

    const db = (process.env.MONGO_DB) ? process.env.MONGO_DB : "No se encontro variable"
    const puerto = (process.env.PORT) ? process.env.PORT : "No se encontro puerto"

    const response = {
        db, puerto
    };

    res.send(response)
});

// // Rutas para usuarios con timeout
router.get('/usuarios', timeout(timeoutDuration), usuarioController.buscarUsuario);
router.post('/usuarios', timeout(timeoutDuration), usuarioController.crearUsuario);
router.put('/usuarios/:id', timeout(timeoutDuration), usuarioController.actualizarUsuario);
router.delete('/usuarios/:id', timeout(timeoutDuration), usuarioController.eliminarUsuario);

// // Rutas para arriendos con timeout
router.get('/arriendos', timeout(timeoutDuration), arriendoController.buscarArriendo);
router.post('/arriendos', timeout(timeoutDuration), arriendoController.crearArriendo);
router.put('/arriendos/:id', timeout(timeoutDuration), arriendoController.actualizarArriendo);
router.delete('/arriendos/:id', timeout(timeoutDuration), arriendoController.eliminarArriendo);

// // Rutas para personas con timeout
router.get('/personas', timeout(timeoutDuration), personaController.buscarPersona);
router.post('/personas', timeout(timeoutDuration), personaController.crearPersona);
router.put('/personas/:id', timeout(timeoutDuration), personaController.actualizarPersona);
router.delete('/personas/:id', timeout(timeoutDuration), personaController.eliminarPersona);

// // Rutas para propiedades con timeout
router.get('/propiedades', timeout(timeoutDuration), propiedadController.buscarPropiedad);
router.post('/propiedades', timeout(timeoutDuration), propiedadController.crearPropiedad);
router.put('/propiedades/:id', timeout(timeoutDuration), propiedadController.actualizarPropiedad);
router.delete('/propiedades/:id', timeout(timeoutDuration), propiedadController.eliminarPropiedad);

module.exports = router;
