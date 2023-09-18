const { Schema, model } = require("mongoose");

const ControlCuentaSchema = Schema({
  idReserva: {
    type: String,
    required: true,
  },
  recepcionista: {
    type: String,
    required: true,
  },
  idRecepcionista: {
    type: String,
    required: true,
  },
  nombrePax: {
    type: String,
    required: true,
  },
  fechaActual: {
    type: Date,
    // required: true
  },
  detalleAbono: {
    type: String,
    required: true,
  },
  abono: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

ControlCuentaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("ControlCuenta", ControlCuentaSchema);
