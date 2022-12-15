/*

Order Routes
/api/orders

*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

const router = Router();

//Obtener eventos
router.get("/", getOrders);

//Crear un evento nuevo
router.post(
  "/",
  [
    check("idSolicitud", "El idSolicitud es obligatorio").not().isEmpty(),
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("estado_solicitud", "El estado de la solicitud es obligatorio")
      .not()
      .isEmpty(),
    check("fecha_solicitud", "La fecha de solicitud es obligatoria")
      .not()
      .isEmpty(),
    check("idSolicitudAlmacen", "El idSolicitudAlmacen es obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  createOrder
);

//Actualizar un evento
router.put("/:id", updateOrder);

//Borrar un evento
router.delete("/:id", deleteOrder);

module.exports = router;
