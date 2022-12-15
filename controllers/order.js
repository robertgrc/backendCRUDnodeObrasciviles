const { response } = require("express");
const Order = require("../models/Order");

const getOrders = (req, res = response) => {
  //verificar que tenga el evento

  console.log(req.body);

  res.json({
    ok: true,
    msg: "getOrders",
  });
};
const createOrder = async (req, res = response) => {
  const order = new Order(req.body);

  try {
    const ordenGuardada = await order.save();

    res.json({
      ok: true,
      msg: ordenGuardada,
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
