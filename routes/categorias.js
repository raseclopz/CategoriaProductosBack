const express = require('express');
const router = express.Router();
const supabase = require('../db');

// Obtener todas las categorías
router.get('/', async (req, res) => {
    try {
        const { data: categorias, error } = await supabase
            .from('categorias')
            .select('*');
        if (error) throw error;
        res.json(categorias);
    } catch (error) {
        console.error('Error al recuperar categorías:', error);
        res.status(500).send(error.message);
    }
});

// Obtener una categoría por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { data: categoria, error } = await supabase
            .from('categorias')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        res.json(categoria);
    } catch (error) {
        console.error('Error al recuperar la categoría:', error);
        res.status(500).send(error.message);
    }
});

// Crear una nueva categoría
router.post('/', async (req, res) => {
    const { nombreCategoria, descripcionCategoria } = req.body;
    console.log('Datos recibidos en el backend:', req.body); // Agregar mensaje de depuración
    try {
        const { data: nuevaCategoria, error } = await supabase
            .from('categorias')
            .insert([{ nombre: nombreCategoria, descripcion: descripcionCategoria }])
            .single();
        if (error) throw error;
        res.json(nuevaCategoria);
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).send(error.message);
    }
});

// Actualizar una categoría
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombreCategoria, descripcionCategoria } = req.body;
    try {
        const { error } = await supabase
            .from('categorias')
            .update({ nombre: nombreCategoria, descripcion: descripcionCategoria })
            .eq('id', id);
        if (error) throw error;
        res.status(204).send();
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).send(error.message);
    }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from('categorias')
            .delete()
            .eq('id', id);
        if (error) throw error;
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
