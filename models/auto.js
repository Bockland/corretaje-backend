const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const autoSchema = new Schema({
    auto_id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    marca: String,
    modelo: String,
    año: Number,
    color: String,
    kilometraje: Number,
    precio: Number,
    tipo_combustible: String,
    transmision: String
    
});

const Auto = mongoose.model('Autos', autoSchema);

module.exports = Auto;
