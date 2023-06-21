const { response } = require('express');
const ComandaConsumoFrigobar = require('../models/ComandaConsumoFrigobar');
const ComandaRestaurante = require('../models/ComandaRestaurante');
const ComandaConsumoCliente = require('../models/ConsumoCliente');
const ComandaLavanderia = require('../models/Lavanderia');

const getComandasByReservaId = async (req, res = response) => {
  const idReserva = req.params.idReserva;

  try {
    const comandasFrigobar = await ComandaConsumoFrigobar.find({ idReserva });
    const comandasRestaurante = await ComandaRestaurante.find({ idReserva });
    const comandasConsumoCliente = await ComandaConsumoCliente.find({ idReserva });
    const comandasLavanderia = await ComandaLavanderia.find({ idReserva });

    const comandas = {
      comandasFrigobar,
      comandasRestaurante,
      comandasConsumoCliente,
      comandasLavanderia
    };

    res.json({
      ok: true,
      comandas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador. Problema al obtener las comandas por ID de reserva',
    });
  }
};

module.exports = {
  getComandasByReservaId,
};