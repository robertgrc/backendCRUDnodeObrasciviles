const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validarCampos } = require("../middlewares/validar-campos");

const { crearUsuario, loginUsuario } = require("../controllers/auth");

router.post(
  "/new",
  [
    //middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

module.exports = router;
