const { response } = require("express");
const Lavanderia = require("../models/Lavanderia");

const getComandasByReservaId = async (req, res = response) => {
  const idReserva = req.params.idReserva;

  try {
    const comandaLavanderia = await Lavanderia.find({ idReserva });

    if (comandaLavanderia.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron comandas de Lavanderia para la reserva con ese id",
      });
    }

    res.json({
      ok: true,
      comandaLavanderia,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener las comandas de Lavanderia por ID",
    });
  }
};

module.exports = {
  getComandasByReservaId,
};