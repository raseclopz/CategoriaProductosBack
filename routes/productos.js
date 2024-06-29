const express = require('express');
const router = express.Router();
const supabase = require('../db');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const { data: productos, error } = await supabase
            .from('productos')
            .select('*');
        if (error) throw error;
        res.json(productos);
    } catch (error) {
        console.error('Error al recuperar productos:', error);
        res.status(500).send(error.message);
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { data: producto, error } = await supabase
            .from('productos')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        res.json(producto);
    } catch (error) {
        console.error('Error al recuperar el producto:', error);
        res.status(500).send(error.message);
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { nombre, descripcion, precio, categoriaId } = req.body;
    try {
        const { data: nuevoProducto, error } = await supabase
            .from('productos')
            .insert([{ nombre, descripcion, precio, categoriaId }])
            .single();
        if (error) throw error;
        res.json(nuevoProducto);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).send(error.message);
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoriaId } = req.body;
    try {
        const { error } = await supabase
            .from('productos')
            .update({ nombre, descripcion, precio, categoriaId })
            .eq('id', id);
        if (error) throw error;
        res.status(204).send();
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send(error.message);
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from('productos')
            .delete()
            .eq('id', id);
        if (error) throw error;
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
