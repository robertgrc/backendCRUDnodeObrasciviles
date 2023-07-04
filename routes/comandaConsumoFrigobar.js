/*
/api/comandaConsumoFrigobar
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt")

const {
  getComandaConsumoFrigobar,
  getComandaConsumoFrigobarById,
  getComandaConsumoFrigobarByReservaId,
  createComandaConsumoFrigobar,
  updateComandaConsumoFrigobar,
  deleteComandaConsumoFrigobar,
} = require("../controllers/comandaConsumoFrigobar");

const router = Router();

//Obtener reservas
router.get("/", getComandaConsumoFrigobar);

//obtenerComandaConsumoFrigobarPorId
router.get("/:id", getComandaConsumoFrigobarById);

//obtenerComandaConsumoFrigobarPorId
router.get("/:idReserva", getComandaConsumoFrigobarByReservaId);

//Crear un reserva
router.post("/",[
  validarJWT
], createComandaConsumoFrigobar);
//Actualizar un reserva
router.put("/:id", updateComandaConsumoFrigobar);
//Borrar un reserva
router.delete("/:id", deleteComandaConsumoFrigobar);

module.exports = router;
