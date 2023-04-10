const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

//Crear servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reserva", require("./routes/reserva"));
app.use("/api/registro", require("./routes/registro"));
app.use("/api/registroTarjetaReserva", require("./routes/registroTarjetaReserva"));
app.use("/api/comandaConsumoFrigobar", require("./routes/comandaConsumoFrigobar"));
app.use("/api/comandaRestaurante", require("./routes/comandaRestaurante"));
app.use("/api/consumoCliente", require("./routes/consumoCliente"));
app.use("/api/lavanderia", require("./routes/lavanderia"));
app.use("/api/controlCuenta", require("./routes/controlCuenta"));
app.use("/api/diarioIngresosEgresos", require("./routes/diarioIngresosEgresos"));


//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`corriendo en el puerto>> ${process.env.PORT}`);
});
