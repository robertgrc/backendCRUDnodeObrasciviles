/*
/api/reserva

*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getRegistros,
  createRegistro,
  updateRegistro,
  deleteRegistro,
} = require("../controllers/registro");

const router = Router();

//Obtener reservas
router.get("/", getRegistros);

//Crear un reserva
router.post(
  "/",
  [
    check("nombreCompleto", "El nombreCompleto es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createRegistro
);

//Actualizar un reserva
router.put("/:id", updateRegistro);

//Borrar un reserva
router.delete("/:id", deleteRegistro);

module.exports = router;
