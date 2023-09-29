const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getCheckout,
  getCheckoutById,
  createCheckout,
} = require("../controllers/checkout");

const router = Router();

//Obtener ControlCuenta
router.get("/", getCheckout);

//ObtenerControlCuenta por Id
router.get("/:id", getCheckoutById);

//Crear un ControlCuenta
router.post("/", [validarJWT], createCheckout);

module.exports = router;
