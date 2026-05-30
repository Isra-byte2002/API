const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express'); // [cite: 495, 552]
const swaggerJsDoc = require('swagger-jsdoc'); // [cite: 497, 551]
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
app.use(express.json());

// ==========================================
// CONEXIÓN A MONGODB ATLAS
// ==========================================
// Remplaza esta cadena con la que te dio MongoDB Atlas. 
// No olvides poner tu usuario, contraseña real y el nombre de la base de datos deseada.
const MONGO_ATLAS_URI = "mongodb+srv://admin:1234@c21100487.pponupa.mongodb.net/?appName=C21100487";

mongoose.connect(MONGO_ATLAS_URI)
    .then(() => console.log('¡Conectado exitosamente a MongoDB Atlas!'))
    .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// ==========================================
// CONFIGURACIÓN DE SWAGGER / OPENAPI [cite: 471]
// ==========================================
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // [cite: 502, 554]
        info: {
            title: 'API Final - Control de Usuarios', // [cite: 503, 556]
            version: '1.0.0', // [cite: 505, 557]
            description: 'Documentación oficial interactiva sincronizada con los endpoints.',
        },
        servers: [
            {
                url: 'http://localhost:3000', // [cite: 506, 560]
                description: 'Servidor Local de Desarrollo'
            }
        ],
    },
    // Le indicamos a swagger-jsdoc que busque la documentación tanto en rutas como en modelos 
    apis: ['./routes/*.js', './models/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions); // [cite: 512, 569]

// Endpoint opcional para ver o descargar el objeto OpenAPI en formato JSON [cite: 602, 603]
app.get('/api-spec', (req, res) => {
    res.json(swaggerDocs); // [cite: 604]
});

// Interfaz gráfica visual de Swagger [cite: 514, 569]
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 

// ==========================================
// RUTAS DE LA APLICACIÓN
// ==========================================
app.use('/api', usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
    console.log(`Accede a la documentación en: http://localhost:${PORT}/api-docs`);
});