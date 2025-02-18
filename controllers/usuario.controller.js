const Usuario = require('../models/usuario'); // Assuming your Usuario model is in the 'models' folder

const buscarUsuario = async (req, res) => {
    try {
        const { username, password, usuario_id } = req.body; 

        const filter = {};
        if (username) filter.username = username;
        if (password) filter.password = password; 
        if (usuario_id) filter.usuario_id = usuario_id;

        const usuarios = await Usuario.find(filter);

        res.status(200).json(usuarios);

    } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};


const crearUsuario = async (req, res) => {
    try {
        
        const { username } = req.body;
        const existingUser = await Usuario.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: 'Ya existe un usuario con ese nombre de usuario' });
        }
        
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();

        res.status(200).json({ message: 'Usuario creado', data: nuevoUsuario });

    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
        if (usuarioActualizado) {
            res.status(200).json({ message: 'Usuario actualizado', data: usuarioActualizado });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {

        const { id } = req.params;
        const usuarioEliminado = await Usuario.findByIdAndRemove(id);

        if (usuarioEliminado) {
            res.status(200).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }

    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { buscarUsuario, crearUsuario, actualizarUsuario, eliminarUsuario };
