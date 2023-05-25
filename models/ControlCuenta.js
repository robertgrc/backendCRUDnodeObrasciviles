const { Schema, model } = require("mongoose");

const ControlCuentaSchema = Schema({
  idReserva: {
    type: String,
    required: true
  },
  fechaActual: {
    type: String,
  },
  detalle: {
    type: String,
    required: true
  },
  consumo: {
    type: Number,
    required: true,
  },
  saldo: {
    type: Number,
    required: true,
  },
  observaciones:{
    type: String,
  },
  totalConsumo: {
    type: Number,
    required: true,
  },
  cuentaPax: [{
    cantidad: {
      type: Number,
      
    },
    detalle: {
      type: String,
     
    },
    tarifa: {
      type: Number,
      
    },
    monto:{
      type: Number,
     
    },
    montoTotal:{
      type: Number,
    }
  }]
});

ControlCuentaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("ControlCuenta", ControlCuentaSchema);