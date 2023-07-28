/*
/api/comandaRestaurante
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getComandasRestauranteById,
  getComandaRestaurante,
  getComandaRestauranteById,
  createComandaRestaurante,
  updateComandaRestaurante,
  deleteComandaRestaurante,
} = require("../controllers/comandaRestaurante");

const router = Router();

// //Obtener con un idReserva las comandas asociadas a ese id
// router.get("/reserva/:idReserva", getComandasRestauranteById);

//Obtener ComandaRestaurante
router.get("/", getComandaRestaurante);

//obtenerComandaRestaurante
router.get("/:id", getComandaRestauranteById);

//Crear un ComandaRestaurante
router.post(
  "/", [
    validarJWT
  ],  createComandaRestaurante
);

//Actualizar un ComandaRestaurante
router.put("/:id", updateComandaRestaurante);

//Borrar un ComandaRestaurante
router.delete("/:id", deleteComandaRestaurante);

module.exports = router;
