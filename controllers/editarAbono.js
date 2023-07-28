const { response } = require("express");
const Abono = require("../models/ControlCuenta");

const getComandasByReservaId = async (req, res = response) => {
  const idReserva = req.params.idReserva;

  try {
    const abono = await Abono.find({ idReserva });

    if (abono.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron abonos para la reserva con ese id",
      });
    }

    res.json({
      ok: true,
      abono,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener los abonos por ID",
    });
  }
};

module.exports = {
  getComandasByReservaId,
};