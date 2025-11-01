const express = require("express");
const router = express.Router(); //manejador de rutas de express
const usuarioSchema = require("../models/usuario");
//Nuevo usuario
router.post("/usuarios", (req, res) => {
 const user = usuarioSchema(req.body);
 user
 .save()
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));

});

//Consultar todos los usuarios
router.get("/usuarios", (req, res) => {
 usuarioSchema.find() //Aqui se ponen los filtros de las especificas
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});
//Consultar cantidad de usuarios registrados

router.get("/usuarios/count", (req, res) => {
 usuarioSchema.countDocuments()
 .then((count) => res.json({ count }))
 .catch((error) => res.json({ message: error }));
});

//Consultar un usuario por su id
router.get("/usuarios/:id", (req, res) => {
 const { id } = req.params;
 usuarioSchema
 .findById(id)
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});



// Eliminar usuario por su id
router.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  usuarioSchema
    .findByIdAndDelete(id) // Busca el usuario por ID y lo elimina
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario eliminado correctamente", data });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

module.exports = router;