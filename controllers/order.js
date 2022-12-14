const { response } = require("express");

const getOrders = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getOrders",
  });
};
const createOrder = (req, res = response) => {
  res.json({
    ok: true,
    msg: "createOrder",
  });
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
