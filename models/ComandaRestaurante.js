const { Schema, model } = require("mongoose");

const ComandaRestauranteSchema = Schema({
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
      mesero: {
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

ComandaRestauranteSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("ComandaRestaurante", ComandaRestauranteSchema);