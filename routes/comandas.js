
const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt")

const {
    getComandasByReservaId
} = require("../controllers/comandaController");

const router = Router();

//obtenerComandaConsumoFrigobarPorId
router.get("/:idReserva", getComandasByReservaId);

module.exports = router;
