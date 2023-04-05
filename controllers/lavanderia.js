const { response } = require("express");
const Lavanderia = require("../models/Lavanderia");

const getLavanderia = async (req, res = response) => {
  //verificar que tenga el evento

  const registros = await Lavanderia.find();

  res.json({
    ok: true,
    registros,
  });
};

const getLavanderiaById = async (req, res = response) =>{
  const lavanderiaId = req.params.id;
  console.log(lavanderiaId);
  try {
    const consumoLavanderiaById = await Lavanderia.findById(lavanderiaId);
    if (!consumoLavanderiaById) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Reserva con ese id",
      });
    }
    const consumofrigobar = {
      ...consumoLavanderiaById,
    }
    console.log(consumofrigobar)
    res.json({
      ok: true,
      reserva:consumoLavanderiaById
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador Problema en LavanderiaById controller",
    });
  }
}
  

const createLavanderia = async (req, res = response) => {
  const registro = new Lavanderia(req.body);

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

const updateLavanderia = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await Lavanderia.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }
    const nuevaSolicitudRegistro = {
      ...req.body,
    };

    const registroUpdate = await Lavanderia.findByIdAndUpdate(
      registroId,
      nuevaSolicitudRegistro,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      registroLavanderia: registroUpdate,
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
const deleteLavanderia = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await Lavanderia.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }

    await Lavanderia.findByIdAndDelete(registroId);
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
  getLavanderia,
  getLavanderiaById,
  createLavanderia,
  updateLavanderia,
  deleteLavanderia,
};
