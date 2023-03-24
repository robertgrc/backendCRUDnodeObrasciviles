const { Schema, model } = require("mongoose");

const ReservaSchema = Schema({
  nombreCompleto: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  tarjetaCredito: {
    type: Number,
    required: true,
  },
  numeroTarjeta: {
    type: Number,
    required: true,
  },
  empresa: {
    type: String,
    required: true,
  },
  telefonoEmpresa: {
    type: String,
    required: true,
  },
  reservadoPor: {
    type: String,
    required: true,
  },
  fechaReserva: {
    type: {},
    required: true,
  },
  tipoHabitacion: {
    type: [],
    required: true,
  },
  observaciones: {
    type: String,
    required: true,
  },
  fechaIngreso: {
    type: String,
    required: true,
  },
  fechaSalida: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    // required: true,
  },
});

ReservaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Reserva", ReservaSchema);
