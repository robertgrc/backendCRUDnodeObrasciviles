const { response } = require("express");
const Order = require("../models/Order");

const getOrders = async (req, res = response) => {
  //verificar que tenga el evento

  const orders = await Order.find();

  res.json({
    ok: true,
    orders,
  });
};

const createOrder = async (req, res = response) => {
  const order = new Order(req.body);

  try {
    order.user = req.uid;

    const ordenGuardada = await order.save();

    res.json({
      ok: true,
      orden: ordenGuardada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Admin",
    });
  }
};
const updateOrder = (req, res = response) => {
  res.json({
    ok: true,
    msg: "updateOrder",
  });
};
const deleteOrder = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteOrder",
  });
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
