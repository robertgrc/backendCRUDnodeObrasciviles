const { response } = require("express");
const ComandaRestaurante = require("../models/ComandaRestaurante");

const getComandaRestaurante = async (req, res = response) => {
  //verificar que tenga el evento

  const registros = await ComandaRestaurante.find();

  res.json({
    ok: true,
    registros,
  });
};

const getComandaRestauranteById = async (req, res = response) =>{
  const comandaRestauranteId = req.params.id;
  console.log(comandaRestauranteId);
  try {
    const comandaRestauranteById = await ComandaRestaurante.findById(comandaRestauranteId);
    if (!comandaRestauranteById) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Reserva con ese id",
      });
    }
    const comandaRestaurante = {
      ...comandaRestauranteById,
    }
    console.log(comandaRestaurante)
    res.json({
      ok: true,
      reserva:comandaRestauranteById
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador Problema en comandaRestaurante controller",
    });
  }
}

const createComandaRestaurante = async (req, res = response) => {
  const registro = new ComandaRestaurante(req.body);

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

const updateComandaRestaurante = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await ComandaRestaurante.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }
    const nuevaSolicitudRegistro = {
      ...req.body,
    };

    const registroUpdate = await ComandaRestaurante.findByIdAndUpdate(
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
const deleteComandaRestaurante = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await ComandaRestaurante.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }

    await ComandaRestaurante.findByIdAndDelete(registroId);
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
  getComandaRestaurante,
  getComandaRestauranteById,
  createComandaRestaurante,
  updateComandaRestaurante,
  deleteComandaRestaurante,
};
