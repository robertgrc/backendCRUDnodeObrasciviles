const { Schema, model } = require("mongoose");

const ComandaConsumoFrigobarSchema = Schema({
    numeroHabitacion: {
        type: Number,
        required: true,
      },
      nombrePax: {
        type: String,
        required: true,
      },
      fechaActual: {
        type: date,
      },
      camarera: {
        type: String,
        required: true,
      },
      totalConsumo: {
        type: Number,
        required: true,
      },
      cantidad: {
        type: Number,
      },
      producto: {
        type: String,
      },
      precio: {
        type: String,
      },
    });

ComandaConsumoFrigobarSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("ComandaConsumoFrigobar", ComandaConsumoFrigobarSchema);
