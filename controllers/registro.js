const { response } = require("express");
const Registro = require("../models/Registro");

const getRegistros = async (req, res = response) => {
  //verificar que tenga el evento

  const registros = await Registro.find();

  res.json({
    ok: true,
    desdeRegistro: true,
    registros,
  });
};
// Se tiene que pasar el mes 01= enero, 02=febrero
const getRegistrosPorMesYAnio = async (req, res = response) => {
  const { mes, anio } = req.params;

  try {
    const registros = await Registro.find({
      fechaIngreso: {
        $regex: `^${anio}-${mes}-\\d{2}`,
      },
    });

    res.json({
      ok: true,
      registros,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener registros por mes y año",
    });
  }
};

const getRegistroById = async (req, res = response) => {
  const registroId = req.params.id;
  console.log(registroId);
  try {
    const registroById = await Registro.findById(registroId);
    if (!registroById) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Reserva con ese id",
      });
    }

    const registro = {
      ...registroById,
    };
    console.log(registro);
    res.json({
      ok: true,
      registro: registroById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const createRegistro = async (req, res = response) => {
  const registro = new Registro(req.body);

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
    const registro = await Registro.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }
    const nuevaSolicitudRegistro = {
      ...req.body,
    };

    const registroUpdate = await Registro.findByIdAndUpdate(
      registroId,
      nuevaSolicitudRegistro,
      { new: true }
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
const deleteRegistro = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await Registro.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }

    await Registro.findByIdAndDelete(registroId);
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
  getRegistrosPorMesYAnio,
  getRegistroById,
  createRegistro,
  updateRegistro,
  deleteRegistro,
};
