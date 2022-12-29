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
    check("idSolicitud", "El idSolicitud es obligatorio").not().isEmpty(),
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("procesoOrigen", "el procesoOrigen es obligatorio").not().isEmpty(),
    check("estado_solicitud", "El estado de la solicitud es obligatorio")
      .not()
      .isEmpty(),
    check("fecha_solicitud", "La fecha de solicitud es obligatoria")
      .not()
      .isEmpty(),
    check("idRegistroExterno", "El idRegistroExterno es obligatorio")
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
