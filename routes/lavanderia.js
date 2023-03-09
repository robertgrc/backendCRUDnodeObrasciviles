/*
/api/lavanderia
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getLavanderia,
  createLavanderia,
  updateLavanderia,
  deleteLavanderia,
} = require("../controllers/lavanderia");

const router = Router();

//Obtener reservas
router.get("/", getLavanderia);

//Crear un reserva
router.post(
  "/", createLavanderia
);

//Actualizar un reserva
router.put("/:id", updateLavanderia);

//Borrar un reserva
router.delete("/:id", deleteLavanderia);

module.exports = router;
