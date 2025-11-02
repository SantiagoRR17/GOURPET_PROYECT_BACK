const mongoose = require("mongoose");

const calificacionSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  receta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receta",
    required: true
  },
  puntaje: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comentario: {
    type: String,
    default: ""
  },
  fecha_calificacion: {
    type: Date,
    default: Date.now
  }
});




module.exports = mongoose.model("Calificacion", calificacionSchema);
