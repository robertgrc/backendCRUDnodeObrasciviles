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
  createComandaConsumoFrigobar,
  updateComandaConsumoFrigobar,
  deleteComandaConsumoFrigobar,
} = require("../controllers/comandaConsumoFrigobar");

const router = Router();

//Obtener reservas
router.get("/", getComandaConsumoFrigobar);

//obtenerComandaConsumoFrigobarPorId
router.get("/:id", getComandaConsumoFrigobarById);

//Crear un reserva
router.post("/", createComandaConsumoFrigobar);
//Actualizar un reserva
router.put("/:id", updateComandaConsumoFrigobar);
//Borrar un reserva
router.delete("/:id", deleteComandaConsumoFrigobar);

module.exports = router;
