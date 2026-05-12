const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    try {

        let error = new Error("Ha ocurrido un error en la ruta usuario");

        next(error);

    } catch(err) {

        next(err);

    }

});

module.exports = router;