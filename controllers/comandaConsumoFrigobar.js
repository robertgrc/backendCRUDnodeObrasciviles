const { response } = require("express");
const ComandaConsumoFrigobar = require("../models/ComandaConsumoFrigobar");

const getComandaConsumoFrigobar = async (req, res = response) => {
  //verificar que tenga el evento
  const registros = await ComandaConsumoFrigobar.find();
  res.json({
    ok: true,
    registros,
  });
};

const getComandaConsumoFrigobarById = async (req, res = response) =>{
  const consumoFrigobarId = req.params.id;
  console.log(consumoFrigobarId);
  try {
    const consumoFrigobarById = await ComandaConsumoFrigobar.findById(consumoFrigobarId);
    if (!consumoFrigobarById) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Reserva con ese id",
      });
    }
    const consumofrigobar = {
      ...consumoFrigobarById,
    };
    console.log(consumofrigobar)
    res.json({
      ok: true,
      reserva:consumoFrigobarById
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador Problema en comandaConsumoFrigobar controller",
    });
  }
}
  
const createComandaConsumoFrigobar = async (req, res = response) => {
  const registro = new ComandaConsumoFrigobar(req.body);

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

const updateComandaConsumoFrigobar = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await ComandaConsumoFrigobar.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun comandaConsumoFrigobar con ese id",
      });
    }
    const nuevaSolicitudRegistro = {
      ...req.body,
    };

    const registroUpdate = await ComandaConsumoFrigobar.findByIdAndUpdate(
      registroId,
      nuevaSolicitudRegistro,
      {
        new: true,
      }
    );

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
const deleteComandaConsumoFrigobar = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await ComandaConsumoFrigobar.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun comandaConsumoFrigobar con ese id",
      });
    }

    await ComandaConsumoFrigobar.findByIdAndDelete(registroId);
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
  getComandaConsumoFrigobar,
  getComandaConsumoFrigobarById,
  createComandaConsumoFrigobar,
  updateComandaConsumoFrigobar,
  deleteComandaConsumoFrigobar,
};
