const { Schema, model } = require("mongoose");

const RegistroSchema = Schema({
  nombreCompleto: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

RegistroSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("RegistroCliente", RegistroSchema);
