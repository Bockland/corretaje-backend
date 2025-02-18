const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    usuario_id: {
        type: String,
        default: uuidv4,
        unique: true 
    },
    nombre: String,
    username: String,
    password: String,
    admin: Number, 
    empresa: String,  
    enable: Boolean    
});

const Usuario = mongoose.model('Usuarios', usuarioSchema);

module.exports = Usuario;