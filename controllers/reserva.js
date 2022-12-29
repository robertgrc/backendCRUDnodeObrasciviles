const { response } = require("express");
const Reserva = require("../models/Reserva");

const getReservas = async (req, res = response) => {
  //verificar que tenga el evento

  const reservas = await Reserva.find();

  res.json({
    ok: true,
    reservas,
  });
};

const createReserva = async (req, res = response) => {
  const reserva = new Reserva(req.body);

  try {
    reserva.user = req.uid;

    const solicitudReservaGuardado = await reserva.save();

    res.json({
      ok: true,
      reserva: solicitudReservaGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

const updateReserva = async (req, res = response) => {
  const reservaId = req.params.id;

  try {
    const reserva = await Reserva.findById(reservaId);

    if (!reserva) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ninguna solicitud de almacen con ese id",
      });
    }
    const nuevaSolicitudReserva = {
      ...req.body,
    };

    const reservaUpdate = await Reserva.findByIdAndUpdate(
      reservaId,
      nuevaSolicitudReserva,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      almacen: reservaUpdate,
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
const deleteReserva = async (req, res = response) => {
  const reservaId = req.params.id;

  try {
    const reserva = await Reserva.findById(reservaId);

    if (!reserva) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ninguna solicitud de reserva con ese id",
      });
    }

    await Reserva.findByIdAndDelete(reservaId);

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
  getReservas,
  createReserva,
  updateReserva,
  deleteReserva,
};
