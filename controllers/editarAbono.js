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

const getAllAbonos = async (req, res = response) => {
  try {
    const abonos = await Abono.find();

    if (abonos.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron abonos",
      });
    }

    res.json({
      ok: true,
      abonos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener los abonos",
    });
  }
};

const getAbonosByRecepcionistaId = async (req, res = response) => {
  const idRecepcionista = req.params.idRecepcionista;

  // Obtén la fecha actual y calcula la fecha hace 24 horas
  const fechaActual = new Date();
  const fechaLimite = new Date(fechaActual);
  fechaLimite.setHours(fechaActual.getHours() - 24);

  try {
    // Busca los abonos realizados por el recepcionista en las últimas 24 horas
    const abonos = await Abono.find({
      idRecepcionista: idRecepcionista,
      fechaActual: { $gte: fechaLimite }, // Filtra por fecha en las últimas 24 horas
    });

    if (abonos.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron abonos para el recepcionista en las últimas 24 horas",
      });
    }

    res.json({
      ok: true,
      abonos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener los abonos por ID de recepcionista",
    });
  }
};

module.exports = {
  getAbonosByRecepcionistaId,
  getComandasByReservaId,
  getAllAbonos,
};
