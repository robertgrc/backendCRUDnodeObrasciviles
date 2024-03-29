const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  createEgreso,
  getEgresosByRecepcionistaId,
  getAllEgresos,
} = require("../controllers/agregarEgreso");

const router = Router();

//obtenerComandasRestaurante por Id
router.post("/", [validarJWT], createEgreso);
router.get("/recepcionista/:idRecepcionista", getEgresosByRecepcionistaId);
router.get("/", getAllEgresos);

module.exports = router;
