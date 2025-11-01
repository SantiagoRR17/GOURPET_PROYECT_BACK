const mongoose = require("mongoose");

const recetaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  ingredientes: {
    type: mongoose.Schema.Types.Mixed, 
    required: true
  },
  tipo_dieta: {
    type: String,
    enum: ["vegana", "vegetariana", "convencional", "cruda"],
    required: true
  },
  especie: {
    type: String,
    enum: ["perro", "gato"],
    required: false
  },
  calificacion_promedio: {
    type: Number,
    default: 0
  },
  publicada: {
    type: Boolean,
    default: true
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now
  },
  creada_por: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
});

/* Middleware para actualizar la fecha de modificación automáticamente
recetaSchema.pre("save", function (next) {
  this.fecha_actualizacion = Date.now();
  next();
});*/

/*Opcional: método para recalcular promedio de calificaciones
recetaSchema.methods.actualizarCalificacionPromedio = async function () {
  const Calificacion = mongoose.model("Calificacion");
  const calificaciones = await Calificacion.find({ receta: this._id });
  if (calificaciones.length > 0) {
    const promedio = calificaciones.reduce((acc, c) => acc + c.puntaje, 0) / calificaciones.length;
    this.calificacion_promedio = promedio;
  } else {
    this.calificacion_promedio = 0;
  }
  await this.save();
};*/

module.exports = mongoose.model("Receta", recetaSchema);