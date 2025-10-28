const express = require("express");
const router = express.Router(); //manejador de rutas de express
const favoritoSchema = require("../models/favorito");

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