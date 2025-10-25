const parser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 
app.use(cors()); 
app.use(express.json());
app.use(parser.urlencoded({ extended: false })); 


app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/recetas", require("./routes/recetas"));
app.use("/api/calificaciones", require("./routes/calificaciones"));
app.use("/api/favoritos", require("./routes/favoritos"));
app.use("/api/reportes", require("./routes/reportes"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gourpet_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(" Conectado a MongoDB"))
  .catch((err) => console.error( err));

app.get("/", (req, res) => {
  res.send(" Bienvenido a la API de Gourpet");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
