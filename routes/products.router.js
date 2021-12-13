const { response } = require('express');
const express = require('express');
const connection = require('./../database/database')
/* const faker = require('faker'); */
const ProductsServices = require('./../services/product.service')

const router = express.Router();
const service = new ProductsServices();

router.get('/', async(req, res) => {
  service.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal en el servidor."
      });
    else res.json(data);
  });
})

router.get('/:id', async(req, res) =>{
  service.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `no se encontró el id id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "algo salió mal al encontrar el id " + req.params.id
        });
      }
    } else res.send(data);
  });
})

router.post('/', async(req, res) =>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const values = {
    ci: req.body.ci,
    direccion: req.body.direccion,
    nombre: req.body.nombre,
    apellido_paterno: req.body.apellido_paterno,
    apellido_materno: req.body.apellido_materno,
    telefono_fijo: req.body.telefono_fijo,
    whatsapp: req.body.whatsapp,
    estado_civil: req.body.estado_civil,
    nacion_originaria: req.body.nacion_originaria,
    grado_educativo: req.body.grado_educativo,
    idioma: req.body.idioma,
    lugar_nacimiento: req.body.lugar_nacimiento,
    sexo: req.body.sexo,
    fecha_nacimiento: req.body.fecha_nacimiento,
    ocupacion: req.body.ocupacion,
    StatementType: req.body.StatementType,
    idupdate: req.body.idupdate
  };

  service.create(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.send(data);

  });
})

router.patch('/:id', async(req, res) =>{
  if (!req.body) {
    res.status(400).send({
      message: "No hay elementos"
    });
  }

  const values = {
    title: req.body.title,
    description: req.body.description,
    age: req.body.age,
    category: req.body.category,
    city: req.body.city,
    address: req.body.address,
    whatsapp: req.body.whatsapp,
    userId: req.body.userId,
    position: req.body.position,
    verificate: req.body.verificate
  };

  service.updateById(req.params.id, values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.send(data);
  });

})

router.delete('/:id', async(req, res) =>{
  service.remove(parseInt(req.params.id), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Algo salió mal al encontrar" + req.params.id
        });
      }
    } else res.send({ message: `Excelente` });
  });
})


module.exports = router;