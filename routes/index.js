const express = require('express');

const productsRouter = require('./products.router');
const citasRouter = require('./citas.router');
const seguimientoRouter = require('./seguimiento.router');
const dentistasRouter = require('./dentistas.router');
const personasRouter = require('./personas.router');
const tutorRouter = require('./tutor.router');
const usersRouter = require('./users.router');
const pacienteRouter = require('./paciente.router');



function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter);
  router.use('/citas', citasRouter);
  router.use('/seguimiento', seguimientoRouter);
  router.use('/dentistas', dentistasRouter);
  router.use('/personas', personasRouter);
  router.use('/paciente', pacienteRouter);
  router.use('/tutor', tutorRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
