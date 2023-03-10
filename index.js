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

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`corriendo en el puerto>> ${process.env.PORT}`);
});
