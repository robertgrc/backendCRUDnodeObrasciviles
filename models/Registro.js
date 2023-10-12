const { Schema, model } = require("mongoose");

const RegistroSchema = Schema({
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
  },
  tarjetaCredito: {
    type: String,
    required: true,
  },
  numeroTarjeta: {
    type: String,
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
  nacionalidad: {
    type: String,
  },
  profesion: {
    type: String,
  },
  procedencia: {
    type: String,
  },
  edad: {
    type: Number,
  },
  estadoCivil: {
    type: String,
  },
  direccion: {
    type: String,
  },
  motivoViaje: {
    type: String,
  },
  tieneEquipaje: {
    type: String,
  },
  tipoHabitacion: {
    type: [],
  },
  fechaIngreso: {
    type: String,
    required: true,
  },
  fechaSalida: {
    type: String,
    required: true,
  },
  estadoHabitacion: {
    type: String,
    required: true,
  },
  numeroHabitacion: {
    type: String,
    required: true,
  },
  observaciones: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

RegistroSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Registro", RegistroSchema);
