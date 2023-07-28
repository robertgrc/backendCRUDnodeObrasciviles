const { response } = require("express");
const ComandaRestaurante = require("../models/ComandaRestaurante");

const getComandasByReservaId = async (req, res = response) => {
  const idReserva = req.params.idReserva;

  try {
    const comandasRestaurante = await ComandaRestaurante.find({ idReserva });

    if (comandasRestaurante.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron comandas de restaurante para la reserva con ese id",
      });
    }

    res.json({
      ok: true,
      comandasRestaurante,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener las comandas de restaurante por ID de reserva",
    });
  }
};

module.exports = {
  getComandasByReservaId,
};