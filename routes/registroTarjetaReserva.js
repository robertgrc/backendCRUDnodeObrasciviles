/*
/api/reserva
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getRegistrosTarjetaReserva,
  createRegistroTarjetaReserva,
  updateRegistroTarjetaReserva,
  deleteRegistroTarjetaReserva,
} = require("../controllers/registroTarjetaReserva");

const router = Router();

//Obtener reservas
router.get("/", getRegistrosTarjetaReserva);

//Crear un reserva
router.post(
  "/",
  [
    check("nombreCompleto", "El nombreCompleto es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createRegistroTarjetaReserva
);

//Actualizar un reserva
router.put("/:id", updateRegistroTarjetaReserva);

//Borrar un reserva
router.delete("/:id", deleteRegistroTarjetaReserva);

module.exports = router;
