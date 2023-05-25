const { response } = require("express");
const RegistroCliente = require("../models/RegistroCliente");

const getRegistros = async (req, res = response) => {
  //verificar que tenga el evento

  const registros = await RegistroCliente.find();

  res.json({
    ok: true,
    desdeRegistro: true,
    registros,
  });
};

const getRegistroById = async (req, res = response) =>{
  const registroId = req.params.id;
  console.log(registroId);
  try {
    const registroById = await RegistroCliente.findById(registroId);
    if (!registroById) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Reserva con ese id",
      });
    }
    
    const registro = {
      ...registroById,
    }
    console.log(registro)
    res.json({
      ok: true,
      registro:registroById,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
}

const createRegistro = async (req, res = response) => {
  const registro = new RegistroCliente(req.body);

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

const updateRegistro = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await RegistroCliente.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }
    const nuevaSolicitudRegistro = {
      ...req.body,
    };

    const registroUpdate = await RegistroCliente.findByIdAndUpdate(registroId,nuevaSolicitudRegistro,{new: true,});

    res.json({
      ok: true,
      registro: registroUpdate,
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
const deleteRegistro = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await RegistroCliente.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }

    await RegistroCliente.findByIdAndDelete(registroId);
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
  getRegistros,
  getRegistroById,
  createRegistro,
  updateRegistro,
  deleteRegistro,
};
