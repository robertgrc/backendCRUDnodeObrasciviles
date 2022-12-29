const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();

//Crear servidor de express
const app = express();

//Base de datos
dbConnection();

//Directorio publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/almacen", require("./routes/almacen"));
app.use("/api/reserva", require("./routes/reserva"));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`corriendo en el puerto>> ${process.env.PORT}`);
});
