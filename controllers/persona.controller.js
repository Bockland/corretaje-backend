const Persona = require('../models/persona'); // Assuming your Persona model is in the 'models' folder

const buscarPersona = async (req, res) => {
    try {
        const { rut, persona_id } = req.query;

        const filter = {};        
        if (rut) filter.password = password; 
        if (persona_id) filter.persona_id = persona_id;

        const personas = await Persona.find(filter);

        res.status(200).json(personas);

    } catch (error) {
        console.error('Error al buscar personas:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};

const crearPersona = async (req, res) => {
    try {
        const { rut } = req.body;
        const existingPersona = await Persona.findOne({ rut });

        if (existingPersona) {
            return res.status(409).json({ message: 'Ya existe una persona con ese rut' });
        }

        const nuevaPersona = new Persona(req.body);
        await nuevaPersona.save();

        res.status(200).json({ message: 'Persona creada', data: nuevaPersona });

    } catch (error) {
        console.error('Error al crear persona:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const actualizarPersona = async (req, res) => {
    try {
        const { id } = req.params;

        const personaActualizada = await Persona.findByIdAndUpdate(id, req.body, { new: true });
        if (personaActualizada) {
            res.status(200).json({ message: 'Persona actualizada', data: personaActualizada });
        } else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }

    } catch (error) {
        console.error('Error al actualizar persona:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};

const eliminarPersona = async (req, res) => {
    try {
        const { id } = req.params; 

        const personaEliminada = await Persona.findByIdAndDelete(id);

        if (personaEliminada) {
            res.status(200).json({ message: 'Persona eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }

    } catch (error) {
        console.error('Error al eliminar persona:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


module.exports = {
    buscarPersona,
    crearPersona,
    actualizarPersona,
    eliminarPersona
};
