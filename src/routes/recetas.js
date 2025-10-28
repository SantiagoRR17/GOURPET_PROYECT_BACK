const express = require("express");
const router = express.Router(); //manejador de rutas de express
const recetaSchema = require("../models/receta");

//Consultar todos los recetas
router.get("/recetas", (req, res) => {
 recetaSchema.find()
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});

//Consultar un receta por su id
router.get("/recetas/:id", (req, res) => {
 const { id } = req.params;
 recetaSchema
 .findById(id)
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});

//Consultar un receta por atributo
router.get("/recetas/buscar", (req, res) => {
 const { campo, valor } = req.query;
 const camposValidos = ['nombre', 'descripcion', 'ingredientes','tipo_dieta', 'especie', 'categoria'];
 if (!camposValidos.includes(campo)) {
   return res.status(400).json({ message: "Campo de búsqueda no válido" });
 }
 recetaSchema
 .find({ [campo]: valor }) //toca revisarlo
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});

//Modificar categoria receta REVISAR
router.put("/recetas/:id/modificar", (req, res) => {
 const { id } = req.params;
 const { categoria} = req.body;
 recetaSchema
 .updateOne({ _id: id }, {
 $set: { categoria }
 })
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});


module.exports = router;