/*
/api/reserva
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getComandaConsumoFrigobar,
  createComandaConsumoFrigobar,
  updateComandaConsumoFrigobar,
  deleteComandaConsumoFrigobar,
} = require("../controllers/registroTarjetaReserva");

const router = Router();

//Obtener reservas
router.get("/", getComandaConsumoFrigobar);

//Crear un reserva
router.post(
  "/",
  [
    check("nombreCompleto", "El nombreCompleto es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createComandaConsumoFrigobar
);

//Actualizar un reserva
router.put("/:id", updateComandaConsumoFrigobar);

//Borrar un reserva
router.delete("/:id", deleteComandaConsumoFrigobar);

module.exports = router;
