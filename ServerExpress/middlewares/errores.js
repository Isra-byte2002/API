function manejadorErrores(err, req, res, next) {

    console.log(err);

    res.status(500).json({
        status: 0,
        message: "Error interno del servidor",
        error: err.message
    });
}

module.exports = manejadorErrores;