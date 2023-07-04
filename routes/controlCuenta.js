/*
/api/controlCliente
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getControlCuenta,
  getControlCuentaById,
  createControlCuenta,
  updateControlCuenta,
  deleteControlCuenta,
} = require("../controllers/controlCuenta");

const router = Router();

//Obtener ControlCuenta
router.get("/", getControlCuenta);

//ObtenerControlCuenta por Id
router.get("/:id", getControlCuentaById);

//Crear un ControlCuenta
router.post("/",[
  validarJWT
], createControlCuenta);

//Actualizar un ControlCuenta
router.put("/:id", updateControlCuenta);

//Borrar un ControlCuenta
router.delete("/:id", deleteControlCuenta);

module.exports = router;
