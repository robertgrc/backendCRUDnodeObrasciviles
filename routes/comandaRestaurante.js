/*
/api/comandaRestaurante
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getComandaRestaurante,
  getComandaRestauranteById,
  createComandaRestaurante,
  updateComandaRestaurante,
  deleteComandaRestaurante,
} = require("../controllers/comandaRestaurante");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

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
