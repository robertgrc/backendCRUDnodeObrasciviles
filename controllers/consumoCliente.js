const { response } = require("express");
const ConsumoCliente = require("../models/ConsumoCliente");

const getConsumoCliente = async (req, res = response) => {
  //verificar que tenga el evento

  const registros = await ConsumoCliente.find();

  res.json({
    ok: true,
    registros,
  });
};

const createConsumoCliente = async (req, res = response) => {
  const registro = new ConsumoCliente(req.body);

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

const updateConsumoCliente = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await ConsumoCliente.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }
    const nuevaSolicitudRegistro = {
      ...req.body,
    };

    const registroUpdate = await ConsumoCliente.findByIdAndUpdate(
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
const deleteConsumoCliente = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await ConsumoCliente.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }

    await ConsumoCliente.findByIdAndDelete(registroId);
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
  getConsumoCliente,
  createConsumoCliente,
  updateConsumoCliente,
  deleteConsumoCliente,
};
