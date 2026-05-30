const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ap_paterno: { type: String, required: true },
  correo: { type: String, unique: true, required: true }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

/**
 * @swagger
 * components:
 * schemas:
 * Usuario:
 * type: object
 * required:
 * - nombre
 * - ap_paterno
 * - correo
 * properties:
 * id:
 * type: string
 * description: ID generado por MongoDB
 * example: 60c72b2f9b1d8b2bad7fff10
 * nombre:
 * type: string
 * example: Juan
 * ap_paterno:
 * type: string
 * example: Perez
 * correo:
 * type: string
 * example: juan.perez@correo.com
 */

module.exports = { Usuario };