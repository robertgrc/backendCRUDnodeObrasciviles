/*
/api/consumoCliente
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getConsumoCliente,
  getConsumoClienteById,
  createConsumoCliente,
  updateConsumoCliente,
  deleteConsumoCliente,
} = require("../controllers/consumoCliente");

const router = Router();

//Obtener reservas
router.get("/", getConsumoCliente);

//ObtenerConsumoCliente por Id
router.get("/:id", getConsumoClienteById);

//Crear un reserva
router.post("/", createConsumoCliente);

//Actualizar un reserva
router.put("/:id", updateConsumoCliente);

//Borrar un reserva
router.delete("/:id", deleteConsumoCliente);

module.exports = router;
