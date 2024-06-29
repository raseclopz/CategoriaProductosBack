const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que la ruta a tu archivo de configuración de la base de datos es correcta

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos');
        const productos = rows.map(row => ({
            idProducto: row.id,
            nombreProducto: row.nombre,
            descripcionProducto: row.descripcion,
            precioProducto: row.precio,
            categoriaId: row.categoriaId
        }));
        console.log('Productos recuperados:', productos); // Mensaje de depuración
        res.json(productos);
    } catch (err) {
        console.error('Error al recuperar productos:', err);
        res.status(500).send(err.message);
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
        if (rows.length > 0) {
            const producto = {
                idProducto: rows[0].id,
                nombreProducto: rows[0].nombre,
                descripcionProducto: rows[0].descripcion,
                precioProducto: rows[0].precio,
                categoriaId: rows[0].categoriaId
            };
            console.log('Producto recuperado:', producto); // Mensaje de depuración
            res.json(producto);
        } else {
            console.log('Producto no encontrado para ID:', id); // Mensaje de depuración
            res.status(404).send('Producto no encontrado');
        }
    } catch (err) {
        console.error('Error al recuperar el producto:', err);
        res.status(500).send(err.message);
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { nombreProducto, descripcionProducto, precioProducto, categoriaId } = req.body;
    try {
        const [result] = await db.query('INSERT INTO productos (nombre, descripcion, precio, categoriaId) VALUES (?, ?, ?, ?)', [nombreProducto, descripcionProducto, precioProducto, categoriaId]);
        const nuevoProducto = {
            idProducto: result.insertId,
            nombreProducto,
            descripcionProducto,
            precioProducto,
            categoriaId
        };
        console.log('Producto creado con ID:', nuevoProducto.idProducto); // Mensaje de depuración
        res.json(nuevoProducto);
    } catch (err) {
        console.error('Error al crear el producto:', err);
        res.status(500).send(err.message);
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombreProducto, descripcionProducto, precioProducto, categoriaId } = req.body;
    try {
        await db.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoriaId = ? WHERE id = ?', [nombreProducto, descripcionProducto, precioProducto, categoriaId, id]);
        console.log('Producto actualizado para ID:', id); // Mensaje de depuración
        res.status(204).send();
    } catch (err) {
        console.error('Error al actualizar el producto:', err);
        res.status(500).send(err.message);
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM productos WHERE id = ?', [id]);
        console.log('Producto eliminado para ID:', id); // Mensaje de depuración
        res.status(204).send();
    } catch (err) {
        console.error('Error al eliminar el producto:', err);
        res.status(500).send(err.message);
    }
});

module.exports = router;
