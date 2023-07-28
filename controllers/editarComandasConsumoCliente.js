const { response } = require("express");
const ConsumoCliente = require("../models/ConsumoCliente");

const getComandasByReservaId = async (req, res = response) => {
  const idReserva = req.params.idReserva;

  try {
    const comandaConsumoCliente = await ConsumoCliente.find({ idReserva });

    if (comandaConsumoCliente.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron comandas de ConsumoCliente para la reserva con ese id",
      });
    }

    res.json({
      ok: true,
      comandaConsumoCliente,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener las comandas de ConsumoCliente por ID",
    });
  }
};

module.exports = {
  getComandasByReservaId,
};