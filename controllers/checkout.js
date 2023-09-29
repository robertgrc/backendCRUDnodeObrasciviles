const { response } = require("express");
const Checkout = require("../models/Checkout");

const getCheckout = async (req, res = response) => {
  //verificar que tenga el evento
  const registros = await Checkout.find();

  res.json({
    ok: true,
    registros,
  });
};

const getCheckoutById = async (req, res = response) => {
  const checkoutId = req.params.id;
  console.log(checkoutId);
  try {
    const checkoutById = await Checkout.findById(checkoutId);
    if (!checkoutById) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Reserva con ese id",
      });
    }
    const consumofrigobar = {
      ...checkoutById,
    };
    console.log(consumofrigobar);
    res.json({
      ok: true,
      reserva: checkoutById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador Problema en checkout controller",
    });
  }
};

const createCheckout = async (req, res = response) => {
  const registro = new Checkout(req.body);

  try {
    registro.user = req.uid;
    console.log("Usuario", registro.user);

    const solicitudRegistroGuardado = await registro.save();

    res.json({
      ok: true,
      msg: "Creado con exito",
      registro: solicitudRegistroGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

module.exports = {
  getCheckout,
  getCheckoutById,
  createCheckout,
};
