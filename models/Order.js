const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  // usuario: {
  //   type: Schema.types.ObjectId,
  //   ref: "Usuario",
  //   require: true,
  // },
});

module.exports = model("Order", OrderSchema);
