const express = require('express');

const app = express();

const usuarioRoutes = require('./routes/usuario');
const manejadorErrores = require('./middlewares/errores');

// Rutas
app.use('/usuario', usuarioRoutes);

// Middleware manejador de errores
app.use(manejadorErrores);

// Servidor
app.listen(3000, () => {

    console.log('Servidor escuchando en puerto 3000');

});