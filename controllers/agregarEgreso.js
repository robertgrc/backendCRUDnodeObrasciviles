const { response } = require("express");
const Egreso = require("../models/AgregarEgreso");
const Registro = require("../models/Registro");

const createEgreso = async (req, res = response) => {
  const registro = new Egreso(req.body);

  try {
    registro.user = req.uid;
    console.log("Usuario", registro.user);

    const solicitudRegistroGuardado = await registro.save();

    res.json({
      ok: true,
      registro: solicitudRegistroGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador problema en AgregarEgreso",
    });
  }
};

const getEgresosByReservaId = async (req, res = response) => {
  const idReserva = req.params.idReserva;

  try {
    const egreso = await Egreso.find({ idReserva });

    if (egreso.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron egresos para la reserva con ese id",
      });
    }

    res.json({
      ok: true,
      egreso,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener los egresos por ID",
    });
  }
};

const getAllEgresos = async (req, res = response) => {
  try {
    const egresos = await Egreso.find();

    if (egresos.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron egresos",
      });
    }

    res.json({
      ok: true,
      egresos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener los egresos",
    });
  }
};
//*------adicionando filtrado y reservas

const getEgresosByRecepcionistaId = async (req, res = response) => {
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
    // Busca los egresos realizados por el recepcionista en la fecha especificada o el día actual
    const egresos = await Egreso.find({
      idRecepcionista: idRecepcionista,
      ...consultaFecha, // Agrega la condición de fecha según lo configurado
    });

    if (egresos.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron egresos para el recepcionista en la fecha especificada",
      });
    }

    // Ahora, para cada egreso, busca la reserva correspondiente por idReserva

    const egresosConReservas = await Promise.all(
      egresos.map(async (egreso) => {
        const reserva = await Registro.findById(egreso.idReserva);
        // return { ...egreso.toObject(), reserva }; // Combina el egreso con la reserva
        if (!reserva) {
          return {
            ...egreso.toObject(),
            habitacion: "",
            nombreHuesped: "",
          };
        }
        const habitacion = `${
          reserva.numeroHabitacion
        }-${reserva.tipoHabitacion.join(", ")}`; // Si tipoHabitacion es un array

        return {
          ...egreso.toObject(),
          habitacion,
          nombreHuesped: reserva.nombreCompleto,
        };
      })
    );
    res.json({
      ok: true,
      egresos: egresosConReservas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador. Problema al obtener los egresos por ID de recepcionista",
    });
  }
};
module.exports = {
  createEgreso,
  getEgresosByRecepcionistaId,
  getEgresosByReservaId,
  getAllEgresos,
};
