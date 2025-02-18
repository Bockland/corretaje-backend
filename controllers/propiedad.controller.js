const Propiedad = require('../models/propiedad'); // Assuming your Propiedad model is in the 'models' folder

const buscarPropiedad = async (req, res) => {
    try {
        
        const { nombre, direccion, propiedad_id } = req.query; 

        const filter = {};
        if (nombre) filter.nombre = nombre;
        if (direccion) filter.direccion = direccion;
        if (propiedad_id) filter.propiedad_id = propiedad_id;

        const propiedades = await Propiedad.find(filter);

        res.status(200).json(propiedades);

    } catch (error) {
        console.error('Error al buscar propiedades:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};


const crearPropiedad = async (req, res) => {
    try {
        
        const { direccion } = req.body;
        const existingPropiedad = await Propiedad.findOne({ direccion }); 

        if (existingPropiedad) {
            return res.status(409).json({ message: 'Ya existe una propiedad con esa direccion' });
        }

        const nuevaPropiedad = new Propiedad(req.body);
        await nuevaPropiedad.save();

        res.status(201).json({ message: 'Propiedad creada', data: nuevaPropiedad });

    } catch (error) {
        console.error('Error al crear propiedad:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const actualizarPropiedad = async (req, res) => {
    try {
        const { id } = req.params;

        const propiedadActualizada = await Propiedad.findByIdAndUpdate(id, req.body, { new: true });
        if (propiedadActualizada) {
            res.status(200).json({ message: 'Propiedad actualizada', data: propiedadActualizada });
        } else {
            res.status(404).json({ message: 'Propiedad no encontrada' });
        }

    } catch (error) {
        console.error('Error al actualizar propiedad:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};


const eliminarPropiedad = async (req, res) => {
    try {
        const { id } = req.params;
        const propiedadEliminada = await Propiedad.findByIdAndRemove(id);

        if (propiedadEliminada) {
            res.status(200).json({ message: 'Propiedad eliminada' });
        } else {
            res.status(404).json({ message: 'Propiedad no encontrada' });
        }

    } catch (error) {
        console.error('Error al eliminar propiedad:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};


module.exports = { buscarPropiedad, crearPropiedad, actualizarPropiedad, eliminarPropiedad };
