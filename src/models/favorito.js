const mongoose = require("mongoose");

const favoritoSchema = new mongoose.Schema({
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
  fecha_agregado: {
    type: Date,
    default: Date.now
  }
});

// Evitar duplicar favoritos (un mismo usuario no puede agregar la misma receta dos veces)
//favoritoSchema.index({ usuario: 1, receta: 1 }, { unique: true });

module.exports = mongoose.model("Favorito", favoritoSchema);
