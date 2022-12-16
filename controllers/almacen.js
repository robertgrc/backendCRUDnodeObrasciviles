const { response } = require("express");
const Almacen = require("../models/Almacen");

const getSolicitudesAlmacenes = async (req, res = response) => {
  //verificar que tenga el evento

  const almacenes = await Almacen.find();

  res.json({
    ok: true,
    almacenes,
  });
};

const createSolicitudAlmacen = async (req, res = response) => {
  const almacen = new Almacen(req.body);

  try {
    almacen.user = req.uid;

    const solicitudAlmacenGuardado = await almacen.save();

    res.json({
      ok: true,
      almacen: solicitudAlmacenGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};
const updateSolicitudAlmacen = async (req, res = response) => {
  const almacenId = req.params.id;

  try {
    const almacen = await Almacen.findById(almacenId);

    if (!almacen) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ninguna solicitud de almacen con ese id",
      });
    }
    const nuevaSolicitudAlmacen = {
      ...req.body,
    };

    const almacenUpdate = await Almacen.findByIdAndUpdate(
      almacenId,
      nuevaSolicitudAlmacen,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      almacen: almacenUpdate,
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
const deleteSolicitudAlmacen = async (req, res = response) => {
  const almacenId = req.params.id;

  try {
    const almacen = await Almacen.findById(almacenId);

    if (!almacen) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ninguna solicitud de almacen con ese id",
      });
    }

    await Almacen.findByIdAndDelete(almacenId);

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
  getSolicitudesAlmacenes,
  createSolicitudAlmacen,
  updateSolicitudAlmacen,
  deleteSolicitudAlmacen,
};
