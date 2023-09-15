const { Router } = require("express");
const { check } = require("express-validator");

const {
  getAbonosPorTurno,
  getComandasByReservaId,
  getAllAbonos,
} = require("../controllers/editarAbono");

const router = Router();

//obtenerComandasRestaurante por Id
router.get("/:idReserva", getComandasByReservaId);
router.get("/", getAllAbonos);

// Ruta para obtener abonos por turno (coloca esto primero)
router.get("/por-turno/:turno", getAbonosPorTurno);

module.exports = router;
