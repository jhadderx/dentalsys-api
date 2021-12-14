'use strict';
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();
const routerApi = require('../routes');

// const router = express.Router();
// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });
// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
// router.post('/', (req, res) => res.json({ postBody: req.body }));

// app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.use(express.json());

/* Solucionando error de cors y agregando limitaciones para puertos */

/* const whiteList = ['http://localhost:3000','http://localhost:4200'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'))
    }
  }
} */

/* app.use(cors(options)); */
app.use(cors());
/* ... */

app.get('/', (req, res) => {
  res.send('Run express server');
});

routerApi(app);

// app.listen(port, () => {
//   console.log('mi port' + port);
// })

module.exports = app;
module.exports.handler = serverless(app);
