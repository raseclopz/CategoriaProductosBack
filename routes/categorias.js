const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que la ruta a tu archivo de configuración de la base de datos es correcta

// Obtener todas las categorías
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorias');
        // Ajustar los nombres de las propiedades para que coincidan con lo que espera el frontend
        const categorias = rows.map(row => ({
            idCategoria: row.id,
            nombreCategoria: row.nombre,
            descripcionCategoria: row.descripcion
        }));
        console.log('Categorías recuperadas:', categorias); // Mensaje de depuración
        res.json(categorias);
    } catch (err) {
        console.error('Error al recuperar categorías:', err);
        res.status(500).send(err.message);
    }
});

// Obtener una categoría por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
        if (rows.length > 0) {
            const categoria = {
                idCategoria: rows[0].id,
                nombreCategoria: rows[0].nombre,
                descripcionCategoria: rows[0].descripcion
            };
            console.log('Categoría recuperada:', categoria); // Mensaje de depuración
            res.json(categoria);
        } else {
            console.log('Categoría no encontrada para ID:', id); // Mensaje de depuración
            res.status(404).send('Categoría no encontrada');
        }
    } catch (err) {
        console.error('Error al recuperar la categoría:', err);
        res.status(500).send(err.message);
    }
});

// Crear una nueva categoría
router.post('/', async (req, res) => {
    const { nombreCategoria, descripcionCategoria } = req.body;
    try {
        const [result] = await db.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombreCategoria, descripcionCategoria]);
        const nuevaCategoria = {
            idCategoria: result.insertId,
            nombreCategoria,
            descripcionCategoria
        };
        console.log('Categoría creada con ID:', nuevaCategoria.idCategoria); // Mensaje de depuración
        res.json(nuevaCategoria);
    } catch (err) {
        console.error('Error al crear la categoría:', err);
        res.status(500).send(err.message);
    }
});

// Actualizar una categoría
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombreCategoria, descripcionCategoria } = req.body;
    try {
        await db.query('UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?', [nombreCategoria, descripcionCategoria, id]);
        console.log('Categoría actualizada para ID:', id); // Mensaje de depuración
        res.status(204).send();
    } catch (err) {
        console.error('Error al actualizar la categoría:', err);
        res.status(500).send(err.message);
    }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM categorias WHERE id = ?', [id]);
        console.log('Categoría eliminada para ID:', id); // Mensaje de depuración
        res.status(204).send();
    } catch (err) {
        console.error('Error al eliminar la categoría:', err);
        res.status(500).send(err.message);
    }
});

module.exports = router;
