/*
/api/diarioIngresosEgresos
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getDiarioIngresosEgresos,
  getDiarioIngresosEgresosById,
  createDiarioIngresosEgresos,
  updateDiarioIngresosEgresos,
  deleteDiarioIngresosEgresos,
} = require("../controllers/diarioIngresosEgresos");

const router = Router();

//Obtener diarioIngresosEgresos
router.get("/", getDiarioIngresosEgresos);

//ObtenerDiarioIngresosEgresos por Id
router.get("/:id", getDiarioIngresosEgresosById);

//Crear un diarioIngresosEgresos
router.post("/", createDiarioIngresosEgresos);

//Actualizar un diarioIngresosEgresos
router.put("/:id", updateDiarioIngresosEgresos);

//Borrar un diarioIngresosEgresos
router.delete("/:id", deleteDiarioIngresosEgresos);

module.exports = router;
