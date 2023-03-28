const { response } = require("express");
const Reserva = require("../models/Reserva");
const Usuario = require("../models/Usuario");

const getReservas = async (req, res = response) => {
  
  const reservas = await Reserva.find();

  res.json({
    ok: true,
    reservas,
  });
};

const getReservaById = async (req, res = response) =>{
  const reservaId = req.params.id;
  try {
    const reservaById = await Reserva.findById(reservaId);
    if (!reservaById) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Reserva con ese id",
      });
    }
    
    const userId = reservaById.reservadoPor;
    console.log(reservaById)
    const user = await Usuario.findById(userId);
    // console.log(user)
    reservaById.reservadoPor=user.name
    const reserva = {
      ...reservaById,
    }
    console.log(reserva)
    res.json({
      ok: true,
      reserva:reservaById
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
}
  
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
        msg: "No existe Reserva con ese id",
      });
    }
    const nuevaReservaActualizada = {
      ...req.body,
    };

    const reservaUpdate = await Reserva.findByIdAndUpdate(reservaId, nuevaReservaActualizada,{new: true,});

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
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
};
