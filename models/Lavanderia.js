const { Schema, model } = require("mongoose");

const LavanderiaSchema = Schema({
    numeroHabitacion: {
        type: Number,
        required: true,
      },
      nombreHuesped: {
        type: String,
        required: true,
      },
      fechaActual: {
        type: String,
      },
      recepcionista: {
        type: String,
        required: true,
      },
      totalCaballeros:{
        type: Number,
        required:true,
      },
      totalDamas:{
        type: Number,
        required:true,
      },
      totalConsumo: {
        type: Number,
        required: true,
      },
      ListaCaballeros: [{
        item: {
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
        },
      }],
      ListaDamas: [{
        item: {
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
      }]
    });

    LavanderiaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Lavanderia", LavanderiaSchema);