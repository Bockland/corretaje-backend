const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const arriendoSchema = new Schema({
    arriendo_id:  {
        type: String,
        default: uuidv4,
        unique: true 
    },
    propiedad_id: String,
    usuario_id: String,
    persona_id: String,
    fecha_inicio: Date,
    fecha_fin: Date,
    monto: Number,
    estado: String
});

const Arriendo = mongoose.model('Arriendos', arriendoSchema);

module.exports = Arriendo;