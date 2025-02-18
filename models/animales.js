const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const animalSchema = new Schema({
    animal_id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    nombre: String,
    especie: String,
    raza: String,
    edad: Number,
    sexo: String,
    color: String
});

const Animal = mongoose.model('Animales', animalSchema);

module.exports = Animal;
