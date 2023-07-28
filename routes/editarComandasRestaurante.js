const { Router } = require("express");
const { check } = require("express-validator");

const {
    getComandasByReservaId
} = require("../controllers/editarComandasRestaurante");

const router = Router();

//obtenerComandasRestaurante por Id
router.get("/:idReserva", getComandasByReservaId);

module.exports = router;