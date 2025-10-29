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


//Editar receta completa REVISAR
router.put("/recetas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const camposPermitidos = ["nombre","descripcion","ingredientes","tipo_dieta","especie","categoria","publicada"];
    const set = {};
    for (const campo of camposPermitidos) {
      if (Object.prototype.hasOwnProperty.call(req.body, campo)) {
        set[campo] = req.body[campo];
      }
    }
    set.fecha_actualizacion = new Date();

    const receta = await recetaSchema.findByIdAndUpdate(
      id,
      { $set: set },
      { new: true, runValidators: true }
    );

    if (!receta) return res.status(404).json({ message: "Receta no encontrada" });
    res.json({ message: "Receta actualizada", data: receta });
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});



//Eliminar receta
router.delete("/recetas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await recetaSchema.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    res.json({ message: "Receta eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});


module.exports = router;