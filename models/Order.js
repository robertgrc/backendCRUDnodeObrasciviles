const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
  idSolicitud: {
    type: Number,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  estado_solicitud: {
    type: String,
    required: true,
  },
  fecha_solicitud: {
    type: String,
    required: true,
  },
  idSolicitudAlmacen: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    //required: true,
  },
});

OrderSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Order", OrderSchema);
