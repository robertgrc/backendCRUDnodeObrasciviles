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

const getAbonosPorTurno = async (req, res = response) => {
  const turno = req.params.turno; // Obtén el turno desde la URL

  try {
    let inicio, fin;

    // Determinar el rango de tiempo según el turno
    switch (turno) {
      case "manana":
        inicio = new Date().setHours(7, 0, 0, 0); // 7:00 AM
        fin = new Date().setHours(15, 0, 0, 0); // 3:00 PM
        break;
      case "tarde":
        inicio = new Date().setHours(15, 0, 0, 0); // 3:00 PM
        fin = new Date().setHours(23, 0, 0, 0); // 11:00 PM
        break;
      case "noche":
        inicio = new Date().setHours(23, 0, 0, 0); // 11:00 PM
        fin = new Date().setHours(7, 0, 0, 0); // 7:00 AM del día siguiente
        break;
      default:
        return res.status(400).json({
          ok: false,
          msg: "Turno no válido",
        });
    }

    const abonos = await Abono.find({
      fecha_hora: { $gte: new Date(inicio), $lt: new Date(fin) },
    });

    if (abonos.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: `No se encontraron abonos para el turno de ${turno}`,
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
      msg: "Hable con el administrador. Problema al obtener los abonos por turno",
    });
  }
};

module.exports = {
  getAbonosPorTurno,
  getComandasByReservaId,
  getAllAbonos,
};
