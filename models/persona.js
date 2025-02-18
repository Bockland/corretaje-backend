const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const personaSchema = new Schema({
    persona_id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    edad: Number,
    profesion: String,
    renta: Number,
    nacionalidad: String,
    rut: String
});

const Persona = mongoose.model('Personas', personaSchema);

module.exports = Persona;
