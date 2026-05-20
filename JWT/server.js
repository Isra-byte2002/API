const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const SECRET_KEY = "mi_clave_secreta";

/*
    Ruta para generar token
*/
app.post('/login', (req, res) => {

    const usuario = {
        id: 1,
        nombre: "Israel"
    };

    const token = jwt.sign(usuario, SECRET_KEY, { expiresIn: '1h' });

    res.json({
        mensaje: 'Token generado',
        token
    });
});

/*
    Ruta protegida
*/
app.get('/privado', verificarToken, (req, res) => {

    res.json({
        mensaje: 'Acceso permitido',
        usuario: req.usuario
    });
});

/*
    Middleware JWT
*/
function verificarToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({
            mensaje: 'Token requerido'
        });
    }

    const token = bearerHeader.split(' ')[1];

    try {

        const usuarioVerificado = jwt.verify(token, SECRET_KEY);

        req.usuario = usuarioVerificado;

        next();

    } catch (error) {

        res.status(401).json({
            mensaje: 'Token inválido'
        });
    }
}

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});