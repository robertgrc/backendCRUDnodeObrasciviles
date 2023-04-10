const { Schema, model } = require("mongoose");

const DiarioIngresosEgresosSchema = Schema({
  numeroHabitacion: {
    type: Number,
    required: true,
  },
  nombreHuesped: {
    type: String,
    required: true,
  },
  detalle: {
    type: String,
  },
  ingresos: {
    type: Number,
    required: true,
  },
  egresos: {
    type: Number,
    required: true,
  },
  saldo: {
    type: Number,
    required: true,
  },
});

    DiarioIngresosEgresosSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("DiarioIngresosEgresos", DiarioIngresosEgresosSchema);