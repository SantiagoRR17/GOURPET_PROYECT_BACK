const parser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/usuarios");
const recetaRoutes = require("./routes/recetas");
const calificacionRoutes = require("./routes/calificaciones");
const favoritoRoutes = require("./routes/favoritos");
require("dotenv").config(); 
app.use(cors()); 
app.use(express.json());
app.use(parser.urlencoded({ extended: false })); 


app.use("/api", userRoutes);
app.use("/api", recetaRoutes);
app.use("/api", calificacionRoutes);
app.use("/api", favoritoRoutes);


mongoose
 .connect(process.env.MONGODB_URI)
 .then(() => console.log("Conexión exitosa"))
 .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send(" Bienvenido a la API de Gourpet");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
