const { response } = require("express");
const ControlCuenta = require("../models/ControlCuenta");

const getControlCuenta = async (req, res = response) => {
  //verificar que tenga el evento

  const registros = await ControlCuenta.find();

  res.json({
    ok: true,
    registros,
  });
};

const getControlCuentaById = async (req, res = response) =>{
  const controlCuentaId = req.params.id;
  console.log(controlCuentaId);
  try {
    const controlCuentaById = await ControlCuenta.findById(controlCuentaId);
    if (!controlCuentaById) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Reserva con ese id",
      });
    }
    const consumofrigobar = {
      ...controlCuentaById,
    }
    console.log(consumofrigobar)
    res.json({
      ok: true,
      reserva:controlCuentaById
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador Problema en controlCuenta controller",
    });
  }
}
  

const createControlCuenta = async (req, res = response) => {
  const registro = new ControlCuenta(req.body);

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

const updateControlCuenta = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await ControlCuenta.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }
    const nuevaSolicitudRegistro = {
      ...req.body,
    };

    const registroUpdate = await ControlCuenta.findByIdAndUpdate(
      registroId,
      nuevaSolicitudRegistro,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      registroControlCuenta: registroUpdate,
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
const deleteControlCuenta = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await ControlCuenta.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }

    await ControlCuenta.findByIdAndDelete(registroId);
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
    getControlCuenta,
    getControlCuentaById,
    createControlCuenta,
    updateControlCuenta,
    deleteControlCuenta,
};
