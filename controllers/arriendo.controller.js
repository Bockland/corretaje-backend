const Arriendo = require('../models/arriendo'); 

const buscarArriendo = async (req, res) => {
    try {
        const { propiedad_id, usuario_id, arriendo_id, persona_id } = req.query; 

        const filter = {};
        if (propiedad_id) filter.propiedad_id = propiedad_id;
        if (usuario_id) filter.usuario_id = usuario_id;
        if (arriendo_id) filter.arriendo_id = arriendo_id;
        if (persona_id) filter.persona_id = persona_id;

        const arriendos = await Arriendo.find(filter);

        res.status(200).json(arriendos); 

    } catch (error) {
        console.error('Error al buscar arriendos:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};

const crearArriendo = async (req, res) => {
    try {

        const { persona_id, propiedad_id, usuario_id } = req.body;

        const existingArriendo = await Arriendo.findOne({ 
            persona_id, 
            propiedad_id, 
            usuario_id 
        });

        if (existingArriendo) {
            return res.status(409).json({ message: 'Ya existe un arriendo con estos datos' });
        }

        const nuevoArriendo = new Arriendo(req.body); 
        await nuevoArriendo.save();

        res.status(200).json({ message: 'Arriendo creado', data: nuevoArriendo });

    } catch (error) {
        console.error('Error al crear arriendo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const actualizarArriendo = async (req, res) => {
    try {
        const { id } = req.params; 

        const arriendoActualizado = await Arriendo.findByIdAndUpdate(id, req.body, { new: true });
        
        if (arriendoActualizado) {
            res.status(200).json({ message: 'Arriendo actualizado', data: arriendoActualizado });
        } else {
            res.status(404).json({ message: 'Arriendo no encontrado' });
        }

    } catch (error) {
        console.error('Error al actualizar arriendo:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};

const eliminarArriendo = async (req, res) => {
    try {
        const { id } = req.params;

        const arriendoEliminado = await Arriendo.findByIdAndRemove(id);

        if (arriendoEliminado) {
            res.status(200).json({ message: 'Arriendo eliminado' });
        } else {
            res.status(404).json({ message: 'Arriendo no encontrado' });
        }

    } catch (error) {
        console.error('Error al eliminar arriendo:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    buscarArriendo,
    crearArriendo,
    actualizarArriendo,
    eliminarArriendo
};
