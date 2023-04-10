const { response } = require("express");
const DiarioIngresosEgresos = require("../models/DiarioIngresosEgresos");

const getDiarioIngresosEgresos = async (req, res = response) => {
  //verificar que tenga el evento

  const registros = await DiarioIngresosEgresos.find();

  res.json({
    ok: true,
    registros,
  });
};

const getDiarioIngresosEgresosById = async (req, res = response) =>{
  const diarioIngresosEgresosId = req.params.id;
  console.log(diarioIngresosEgresosId);
  try {
    const diarioIngresosEgresosById = await DiarioIngresosEgresos.findById(diarioIngresosEgresosId);
    if (!diarioIngresosEgresosById) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Reserva con ese id",
      });
    }
    const consumofrigobar = {
      ...diarioIngresosEgresosById,
    }
    console.log(consumofrigobar)
    res.json({
      ok: true,
      reserva:diarioIngresosEgresosById
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador Problema en diarioIngresosEgresos controller",
    });
  }
}
  

const createDiarioIngresosEgresos = async (req, res = response) => {
  const registro = new DiarioIngresosEgresos(req.body);

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

const updateDiarioIngresosEgresos = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await DiarioIngresosEgresos.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }
    const nuevaSolicitudRegistro = {
      ...req.body,
    };

    const registroUpdate = await DiarioIngresosEgresos.findByIdAndUpdate(
      registroId,
      nuevaSolicitudRegistro,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      registroDiarioIngresosEgresos: registroUpdate,
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
const deleteDiarioIngresosEgresos = async (req, res = response) => {
  const registroId = req.params.id;

  try {
    const registro = await DiarioIngresosEgresos.findById(registroId);

    if (!registro) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun registro con ese id",
      });
    }

    await DiarioIngresosEgresos.findByIdAndDelete(registroId);
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
    getDiarioIngresosEgresos,
    getDiarioIngresosEgresosById,
    createDiarioIngresosEgresos,
    updateDiarioIngresosEgresos,
    deleteDiarioIngresosEgresos,
};
