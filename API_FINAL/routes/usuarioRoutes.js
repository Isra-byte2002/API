const express = require('express');
const router = express.Router();
const { Usuario } = require('../models/Usuario');

/**
 * @swagger
 * tags:
 * - name: Usuarios
 * description: Operaciones del catálogo de usuarios en MongoDB Atlas
 */

/**
 * @swagger
 * /api/usuarios:
 * post:
 * summary: Registrar un nuevo usuario
 * tags: [Usuarios]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * responses:
 * 201:
 * description: Usuario guardado exitosamente.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * 400:
 * description: Error en los datos proporcionados.
 */
router.post('/usuarios', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json({
      id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      ap_paterno: nuevoUsuario.ap_paterno,
      correo: nuevoUsuario.correo
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 * get:
 * summary: Obtener un Usuario por ID
 * tags: [Usuarios]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID unico del usuario
 * responses:
 * 200:
 * description: Datos del usuario encontrado.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * 404:
 * description: Usuario no encontrado.
 */
router.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({
      id: usuario._id,
      nombre: usuario.nombre,
      ap_paterno: usuario.ap_paterno,
      correo: usuario.correo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 * put:
 * summary: Actualizar datos de un usuario
 * tags: [Usuarios]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID del usuario a modificar
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * responses:
 * 200:
 * description: Usuario actualizado exitosamente.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * 404:
 * description: Usuario no encontrado.
 */
router.put('/usuarios/:id', async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!usuarioActualizado) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({
      id: usuarioActualizado._id,
      nombre: usuarioActualizado.nombre,
      ap_paterno: usuarioActualizado.ap_paterno,
      correo: usuarioActualizado.correo
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 * delete:
 * summary: Eliminar un usuario
 * tags: [Usuarios]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID del usuario a eliminar
 * responses:
 * 200:
 * description: Confirmacion de eliminacion.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Usuario eliminado correctamente
 * 404:
 * description: Usuario no encontrado.
 */
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;