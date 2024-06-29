const express = require('express');
const cors = require('cors');
const categoriasRouter = require('./routes/categorias'); // Ajusta la ruta según tu estructura de proyecto
const productosRouter = require('./routes/productos'); // Ajusta la ruta según tu estructura de proyecto

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/categorias', categoriasRouter);
app.use('/apiProductos/productos', productosRouter); // Ajusta la ruta según tu estructura de proyecto

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
