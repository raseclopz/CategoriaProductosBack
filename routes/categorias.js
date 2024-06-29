const express = require('express');
const router = express.Router();
const supabase = require('../db'); // Ajusta la ruta según tu estructura de proyecto

// Crear una nueva categoría
router.post('/', async (req, res) => {
    const { nombre, descripcion } = req.body;
    console.log('Datos recibidos en el backend:', req.body); // Depuración
    console.log('Nombre:', nombre); // Depuración
    console.log('Descripcion:', descripcion); // Depuración

    try {
        // Asegúrate de que los nombres de las propiedades coinciden con los de la base de datos
        const { data: nuevaCategoria, error } = await supabase
            .from('categorias')
            .insert([{ nombre, descripcion }])
            .single();
        if (error) throw error;
        res.json(nuevaCategoria);
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
