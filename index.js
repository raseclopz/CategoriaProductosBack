const express = require('express');
const app = express();
const categoriasRoutes = require('./routes/categorias');
const productosRoutes = require('./routes/productos');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use('/apiCategorias/categorias', categoriasRoutes);
app.use('/apiProductos/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
