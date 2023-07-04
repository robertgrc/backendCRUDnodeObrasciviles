const { Schema, model } = require("mongoose");

const ComandaConsumoFrigobarSchema = Schema({
  idReserva: {
    type: String,
    required: true
  },
  numeroHabitacion: {
    type: Number,
    required: true,
  },
  nombrePax: {
    type: String,
    required: true,
  },
  fechaActual: {
    type: String,
  },
  camarera: {
    type: String,
    required: true,
  },
  totalConsumo: {
    type: Number,
    required: true,
  },
  productos: [{
    producto: {
      type: String,
      required: true
    },
    precio: {
      type: Number,
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

ComandaConsumoFrigobarSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("ComandaConsumoFrigobar", ComandaConsumoFrigobarSchema);
