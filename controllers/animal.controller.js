const Animal = require('../models/animales'); 

const buscarAnimal = async (req, res) => {
    try {
        const { nombre, especie, animal_id } = req.body; 

        const filter = {};
        if (nombre) filter.nombre = nombre;
        if (especie) filter.especie = especie; 
        if (animal_id) filter.animal_id = animal_id;

        const animales = await Animal.find(filter);

        res.status(200).json(animales);

    } catch (error) {
        console.error('Error al buscar animales:', error);
        res.status(400).json({ message: 'Error interno del servidor' });
    }
};


const crearAnimal = async (req, res) => {
    try {
        const { nombre, especie, raza, edad, sexo, color } = req.body;
        const nuevoAnimal = new Animal({ nombre, especie, raza, edad, sexo, color });
        
        await nuevoAnimal.save();
        res.status(201).json({ message: 'Animal creado correctamente', animal: nuevoAnimal }); 

    } catch (error) {
        console.error('Error al crear animal:', error);
        res.status(500).json({ message: 'Error interno del servidor' }); 
    }
};

const actualizarAnimal = async (req, res) => {
    try {
        const { animal_id } = req.params; 
        const { nombre, especie, raza, edad, sexo, color } = req.body;

        const animalActualizado = await Animal.findOneAndUpdate(
            { animal_id: animal_id }, 
            { nombre, especie, raza, edad, sexo, color },
            { new: true } 
        );

        if (animalActualizado) {
            res.status(200).json({ message: 'Animal actualizado correctamente', animal: animalActualizado });
        } else {
            res.status(404).json({ message: 'Animal no encontrado' });
        }

    } catch (error) {
        console.error('Error al actualizar animal:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const eliminarAnimal = async (req, res) => {
    try {
        const { animal_id } = req.params;

        const animalEliminado = await Animal.findOneAndDelete({ animal_id: animal_id });

        if (animalEliminado) {
            res.status(200).json({ message: 'Animal eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Animal no encontrado' });
        }

    } catch (error) {
        console.error('Error al eliminar animal:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


module.exports = {
    buscarAnimal,
    crearAnimal,
    actualizarAnimal,
    eliminarAnimal
};
