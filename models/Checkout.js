const { Schema, model } = require("mongoose");

const CheckoutSchema = Schema({
  idReserva: {
    type: String,
    required: true,
  },
  idRecepcionista: {
    type: String,
    required: true,
  },
  recepcionista: {
    type: String,
    required: true,
  },
  nombrePax: {
    type: String,
    required: true,
  },
  //   sumatoriaAbonos: {
  //     type: Number,
  //   },
  //   sumatoriaCreditos: {
  //     type: Number,
  //   },
  //   pagoPendiente: {
  //     type: Number,
  //   },
  fechaActual: {
    type: Date,
    // required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

CheckoutSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Checkout", CheckoutSchema);
