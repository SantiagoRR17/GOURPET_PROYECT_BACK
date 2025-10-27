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

/* Evitar que un mismo usuario califique la misma receta más de una vez
calificacionSchema.index({ usuario: 1, receta: 1 }, { unique: true });

 Middleware opcional: actualizar promedio de la receta cuando se crea o modifica una calificación
calificacionSchema.post("save", async function () {
  const Receta = mongoose.model("Receta");
  const Calificacion = mongoose.model("Calificacion");

  const calificaciones = await Calificacion.find({ receta: this.receta });
  if (calificaciones.length > 0) {
    const promedio =
      calificaciones.reduce((acc, c) => acc + c.puntaje, 0) / calificaciones.length;
    await Receta.findByIdAndUpdate(this.receta, { calificacion_promedio: promedio });
  }
});*/

module.exports = mongoose.model("Calificacion", calificacionSchema);
