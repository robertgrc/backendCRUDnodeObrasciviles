const { response } = require("express");
const ComandaConsumoFrigobar = require("../models/ComandaConsumoFrigobar");

const getComandasByReservaId = async (req, res = response) => {
  const idReserva = req.params.idReserva;

  try {
    const comandaFrigobar = await ComandaConsumoFrigobar.find({ idReserva });

    if (comandaFrigobar.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron comandas de frigobar para la reserva con ese id",
      });
    }

    res.json({
      ok: true,
      comandaFrigobar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener las comandas de frigobar por ID",
    });
  }
};

module.exports = {
  getComandasByReservaId,
};