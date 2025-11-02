const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre_usuario: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  contrasena: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ["invitado", "dueño", "administrador"],
    default: "invitado"
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  },
  activo: {
    type: Boolean,
    default: true
  }
});



module.exports = mongoose.model("Usuario", usuarioSchema);
