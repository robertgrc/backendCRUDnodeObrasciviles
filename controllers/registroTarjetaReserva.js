const { response } = require("express");
const RegistroTarjetaReserva = require("../models/RegistroTarjetaReserva");

const getRegistrosTarjetaReserva = async (req, res = response) => {
  //verificar que tenga el evento

  const registros = await RegistroTarjetaReserva.find();

  res.json({
    ok: true,
    registros,
  });
};

const createRegistroTarjetaReserva = async (req, res = response) => {
  const registro = new RegistroTarjetaReserva(req.body);

  try {
    registro.user = req.uid;

    const solicitudRegistroGuardado = await registro.save();

    res.json({
      ok: true,
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

const updateRegistroTarjetaReserva = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await RegistroTarjetaReserva.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }
    const nuevaSolicitudRegistro = {
      ...req.body,
    };

    const registroUpdate = await RegistroTarjetaReserva.findByIdAndUpdate(
      registroId,
      nuevaSolicitudRegistro,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      almacen: registroUpdate,
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
const deleteRegistroTarjetaReserva = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await RegistroTarjetaReserva.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }

    await RegistroTarjetaReserva.findByIdAndDelete(registroId);
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
  getRegistrosTarjetaReserva,
  createRegistroTarjetaReserva,
  updateRegistroTarjetaReserva,
  deleteRegistroTarjetaReserva,
};
