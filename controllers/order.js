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
const updateOrder = async (req, res = response) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ninguna obra con ese id",
      });
    }
    const newOrder = {
      ...req.body,
    };

    const orderUpdate = await Order.findByIdAndUpdate(orderId, newOrder, {
      new: true,
    });

    res.json({
      ok: true,
      order: orderUpdate,
    });

    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};
const deleteOrder = async (req, res = response) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ninguna obra con ese id",
      });
    }

    await Order.findByIdAndDelete(orderId);

    res.json({
      ok: true,
    });

    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
