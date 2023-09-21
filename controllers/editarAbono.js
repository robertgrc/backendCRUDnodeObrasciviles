const { response } = require("express");
const Abono = require("../models/ControlCuenta");
const Registro = require("../models/Registro");

const getComandasByReservaId = async (req, res = response) => {
  const idReserva = req.params.idReserva;

  try {
    const abono = await Abono.find({ idReserva });

    if (abono.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron abonos para la reserva con ese id",
      });
    }

    res.json({
      ok: true,
      abono,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener los abonos por ID",
    });
  }
};

const getAllAbonos = async (req, res = response) => {
  try {
    const abonos = await Abono.find();

    if (abonos.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron abonos",
      });
    }

    res.json({
      ok: true,
      abonos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener los abonos",
    });
  }
};
//*------adicionando filtrado y reservas

const getAbonosByRecepcionistaId = async (req, res = response) => {
  const idRecepcionista = req.params.idRecepcionista;
  const fechaConsulta = req.query.fecha; // Puede ser la fecha actual o una fecha específica

  let consultaFecha = {};

  if (fechaConsulta) {
    // Si se proporciona una fecha, consulta solo para esa fecha
    const fechaConsultaObj = new Date(fechaConsulta);
    fechaConsultaObj.setHours(0, 0, 0, 0); // Establece la fecha al inicio del día
    const fechaFinDia = new Date(
      fechaConsultaObj.getTime() + 24 * 60 * 60 * 1000
    ); // Fin del día

    consultaFecha = {
      fechaActual: {
        $gte: fechaConsultaObj,
        $lt: fechaFinDia,
      },
    };
  } else {
    // Si no se proporciona una fecha, consulta para el día actual
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Establece la fecha al inicio del día
    const fechaFinDia = new Date(fechaActual.getTime() + 24 * 60 * 60 * 1000); // Fin del día

    consultaFecha = {
      fechaActual: {
        $gte: fechaActual,
        $lt: fechaFinDia,
      },
    };
  }

  try {
    // Busca los abonos realizados por el recepcionista en la fecha especificada o el día actual
    const abonos = await Abono.find({
      idRecepcionista: idRecepcionista,
      ...consultaFecha, // Agrega la condición de fecha según lo configurado
    });

    if (abonos.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron abonos para el recepcionista en la fecha especificada",
      });
    }

    // Ahora, para cada abono, busca la reserva correspondiente por idReserva

    const abonosConReservas = await Promise.all(
      abonos.map(async (abono) => {
        const reserva = await Registro.findById(abono.idReserva);
        // return { ...abono.toObject(), reserva }; // Combina el abono con la reserva
        if (!reserva) {
          return {
            ...abono.toObject(),
            habitacion: "",
            nombreHuesped: "",
          };
        }
        const habitacion = `${
          reserva.numeroHabitacion
        }-${reserva.tipoHabitacion.join(", ")}`; // Si tipoHabitacion es un array

        return {
          ...abono.toObject(),
          habitacion,
          nombreHuesped: reserva.nombreCompleto,
        };
      })
    );
    res.json({
      ok: true,
      abonos: abonosConReservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener los abonos por ID de recepcionista",
    });
  }
};
module.exports = {
  getAbonosByRecepcionistaId,
  getComandasByReservaId,
  getAllAbonos,
};
