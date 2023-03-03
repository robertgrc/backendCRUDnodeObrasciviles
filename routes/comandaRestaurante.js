/*
/api/comandaRestaurante
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getComandaRestaurante,
  createComandaRestaurante,
  updateComandaRestaurante,
  deleteComandaRestaurante,
} = require("../controllers/comandaRestaurante");

const router = Router();

//Obtener reservas
router.get("/", getComandaRestaurante);

//Crear un reserva
router.post(
  "/", createComandaRestaurante
);

//Actualizar un reserva
router.put("/:id", updateComandaRestaurante);

//Borrar un reserva
router.delete("/:id", deleteComandaRestaurante);

module.exports = router;
