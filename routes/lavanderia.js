/*
/api/lavanderia
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getLavanderia,
  getLavanderiaById,
  createLavanderia,
  updateLavanderia,
  deleteLavanderia,
} = require("../controllers/lavanderia");

const router = Router();

//Obtener registros Lavanderia
router.get("/", getLavanderia);

//Obtener registro de Lavanderia con Id
router.get("/:id", getLavanderiaById);

//Crear un registro de Lavanderia
router.post("/", createLavanderia);

//Actualizar un registro de Lavanderia
router.put("/:id", updateLavanderia);

//Borrar un registro de Lavanderia
router.delete("/:id", deleteLavanderia);

module.exports = router;
