const { Router } = require("express");
const { check } = require("express-validator");

const {
  getComandasByReservaId,
  getAbonosByRecepcionistaId,
  getAllAbonos,
} = require("../controllers/editarAbono");

const router = Router();

//obtenerComandasRestaurante por Id
router.get("/:idReserva", getComandasByReservaId);
router.get("/recepcionista/:idRecepcionista", getAbonosByRecepcionistaId);
router.get("/", getAllAbonos);

module.exports = router;
