const express = require("express");
const router = express.Router(); //manejador de rutas de express
const favoritoSchema = require("../models/favorito");

// Crear un nuevo favorito
router.post("/favoritos", async (req, res) => {
  try {
    const { usuario, receta } = req.body;
    if (!usuario || !receta) {
      return res.status(400).json({ message: "usuario y receta son requeridos" });
    }
    const existente = await favoritoSchema.findOne({ usuario, receta });
    if (existente) {
      return res.status(409).json({ message: "Este favorito ya existe" });
    }
    const nuevoFavorito = new favoritoSchema({ usuario, receta });
    const data = await nuevoFavorito.save();
    res.status(201).json({
      message: "Favorito creado correctamente",
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Error al crear favorito" });
  }
});

//Consultar todos los favoritos
router.get("/favoritos", (req, res) => {
 favoritoSchema.find()
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});

//Consultar un favoritos por su id
router.get("/favoritos/:id", (req, res) => {
 const { id } = req.params;
 favoritoSchema
 .findById(id)
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});

//Eliminar un favorito por su id
router.delete("/favoritos/:id", (req, res) => {
 const { id } = req.params;
 favoritoSchema
 .findByIdAndDelete(id)
 .then((data) => {
 res.json(data);
 })
 .catch((error) => {
 res.json({ message: error });
});
});

module.exports = router;