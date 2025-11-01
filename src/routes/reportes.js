const express = require("express");
const router = express.Router(); //manejador de rutas de express
const reporteSchema = require("../models/reporte");
const usuarioSchema = require("../models/usuario");
//Nuevo reporte
router.post("/reportes", (req, res) => {
 const reporte = reporteSchema(req.body);
 reporte //revisar
 .save()
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));

});

//Consultar todos los reportes
router.get("/reportes", (req, res) => {
 usuarioSchema.countDocuments()
  .then((count) => res.json({ count }))
  .catch((error) => res.json({ message: error }));
});

module.exports = router;