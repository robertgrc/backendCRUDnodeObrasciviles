/*
/api/reserva

*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getRegistros,
  getRegistroById,
  createRegistro,
  updateRegistro,
  deleteRegistro,
} = require("../controllers/registroCliente");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Obtener registro
router.get("/", getRegistros);

router.get("/:id", getRegistroById);

//Crear un registro
router.post(
  "/",
  [
    check("nombreCompleto", "El nombreCompleto es obligatorio").not().isEmpty(),
    validarJWT,
    validarCampos,
  ],
  createRegistro
);

//Actualizar un registro
router.put("/:id", updateRegistro);

//Borrar un registro
router.delete("/:id", deleteRegistro);

module.exports = router;
