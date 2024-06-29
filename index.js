const express = require('express');
const cors = require('cors');
const categoriasRouter = require('./routes/categorias'); // Ajusta la ruta según tu estructura de proyecto

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/categorias', categoriasRouter); // Ruta base para categorías

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
