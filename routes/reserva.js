/*
/api/reserva

*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getReservas,
  createReserva,
  updateReserva,
  deleteReserva,
} = require("../controllers/reserva");

const router = Router();

//Obtener reservas
router.get("/", getReservas);

//Crear un reserva
router.post(
  "/",
  [
    check("nombreCompleto", "El nombreCompleto es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("telefono", "La telefono es obligatoria").not().isEmpty(),
    check("reservadoPor", "La persona que reserva es un dato obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  createReserva
);

//Actualizar un reserva
router.put("/:id", updateReserva);

//Borrar un reserva
router.delete("/:id", deleteReserva);

module.exports = router;
