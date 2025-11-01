const express = require("express");
const router = express.Router(); //manejador de rutas de express
const recetaSchema = require("../models/receta");

router.post("/receta", async (req, res) => { 
  try { 
    const { nombre, descripcion, ingredientes, tipo_dieta, especie, creada_por } = req.body; 
    // Validaciones básicas de los datos requeridos 
    if (!nombre || !descripcion || !ingredientes || !tipo_dieta || !creada_por) { 
      return res.status(400).json({ error: "Faltan datos requeridos" }); 
    } 
    //Crear una nueva receta 
    const nuevaReceta = new recetaSchema({ 
      nombre, descripcion, ingredientes, tipo_dieta, especie, creada_por, 
    }); 
    //Guardar la receta en la base de datos 
    await nuevaReceta.save(); 
    res.status(201).json(nuevaReceta); 
  } catch (error) { 
    res.status(500).json({ error: "Hubo un error al crear la receta" }); 
  } 
}); 


//Consultar todos los recetas
router.get("/recetas", (req, res) => {
 recetaSchema.find()
 .then((data) => res.json(data))
 .catch((error) => res.json({ message: error }));
});
// Ruta para obtener las recetas con la calificación más alta
router.get("/reportes/top-recetas", async (req, res) => {
  try {
    // Obtener todas las recetas con sus calificaciones asociadas
    const calificaciones = await calificacionSchema.aggregate([
      { $group: { _id: "$receta", promedio_calificacion: { $avg: "$puntaje" } } },
      { $sort: { promedio_calificacion: -1 } }, // Ordenar de mayor a menor calificación
      { $limit: 5 } // Obtener las 5 mejores recetas
    ]);

    // Obtener los detalles de las recetas
    const recetasTop = await recetaSchema.find({
      '_id': { $in: calificaciones.map(c => c._id) }
    });

    res.json(recetasTop); // Devolver las recetas con las calificaciones más altas
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
 const camposValidos = ['nombre', 'descripcion', 'ingredientes','tipo_dieta', 'especie'];
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
    const camposPermitidos = ["nombre","descripcion","ingredientes","tipo_dieta","especie","publicada"];
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


router.delete("/recetas/:id", async (req, res) => { 

  try { 
    const { id } = req.params; 
    // Buscar la receta por su ID 
    const receta = await Receta.findById(id); 

      if (!receta) { 

        return res.status(404).json({ error: "Receta no encontrada" }); 
      } 
    // Eliminar la receta 
    await receta.remove(); 
    res.status(200).json({ message: "Receta eliminada correctamente" }); 
  } catch (error) { 
    res.status(500).json({ error: "Hubo un error al eliminar la receta" }); 
  } 
}); 



// Publicar o despublicar receta
router.patch("/recetas/:id/publicar", async (req, res) => {
  try {
    const { id } = req.params;
    const { publicada } = req.body; // Esperamos que se pase el estado: true o false
    
    // Validación simple para asegurarse de que el estado esté presente
    if (publicada === undefined) {
      return res.status(400).json({ message: "El estado de publicación debe ser proporcionado (true/false)." });
    }

    // Actualizar el estado de 'publicada'
    const receta = await recetaSchema.findByIdAndUpdate(
      id,
      { $set: { publicada } }, // Seteamos el estado de 'publicada' como true o false
      { new: true, runValidators: true }
    );

    if (!receta) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }

    res.json({ message: "Receta actualizada", data: receta });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






module.exports = router;