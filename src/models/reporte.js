const mongoose = require("mongoose");

const reporteSchema = new mongoose.Schema({
  tipo_reporte: {
    type: String,
    enum: ["top_recetas", "usuarios_registrados"],
    required: true
  },
  fecha_generacion: {
    type: Date,
    default: Date.now
  },
  datos: {
    type: mongoose.Schema.Types.Mixed, 
    required: true
  }/*,
  generado_por: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }*/
});

module.exports = mongoose.model("Reporte", reporteSchema);
