const { response } = require('express');
const express = require('express');
const connection = require('./../database/database');
const CitasServices = require('./../services/citas.service');

const router = express.Router();
const service = new CitasServices();

router.get('/xxx', async(req, res) => {
  res.json({text: 'the ad doesnt exist'});
})

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

router.get('/one/:id', async(req, res) =>{
  service.GetOneById(req.params.id, (err, data) => {
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
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    whatsapp: req.body.whatsapp,
    razon: req.body.razon,
    descripcion: req.body.descripcion,
    fecha_hora: req.body.fecha_hora,
    dentista_id: req.body.dentista_id,
    StatementType: "insert",
    idupdate: 0
  };

  service.create(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.json({status: 'ok', message: 'muy gueno', data: data});
  });
});


router.post('/prueba', async(req, res) =>{
  res.json({status: 'ok', message: 'muy gueno'});
  console.log("ver esto", req.body);
});

router.patch('/:id', async(req, res) =>{
  if (!req.body) {
    res.status(400).send({
      message: "No hay elementos"
    });
  }

  const values = {
    ci: req.body.ci,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    whatsapp: req.body.whatsapp,
    razon: req.body.razon,
    descripcion: req.body.descripcion,
    fecha_hora: req.body.fecha_hora,
    dentista_id: req.body.dentista_id,
    StatementType: req.body.StatementType,
    idupdate: req.body.idupdate
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

router.delete('/x/:id', async(req, res) =>{
  service.remove(req.params.id, (err, data) => {
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

router.delete('/:id', async(req, res) =>{
  service.remove(req.params.id, (err, data) => {
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
    } else res.send({status: 'ok', message: 'muy gueno', data: data});
  });
})


module.exports = router;
