/*

Order Routes
/api/orders

*/

const { Router } = require("express");

const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

const router = Router();

//Obtener eventos
router.get("/", getOrders);

//Crear un evento nuevo
router.post("/", createOrder);

//Actualizar un evento
router.put("/:id", updateOrder);

//Borrar un evento
router.delete("/:id", deleteOrder);

module.exports = router;
