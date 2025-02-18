const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const propiedadSchema = new Schema({
    propiedad_id: {
        type: String,
        default: uuidv4,
        unique: true 
    },
    nombre: String,
    direccion: String,
    calle: String,
    numero: String,
    descripcion: String,
    comuna: String,
    region: String,
    precio: Number,
    usuario: String,
    disponible: Boolean,
    publicado: Boolean
});

const Propiedad = mongoose.model('Propiedades', propiedadSchema);

module.exports = Propiedad;