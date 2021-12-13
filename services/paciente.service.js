const faker = require('faker');
const connection = require('../database/database');
class PacientesServices {

  constructor() {
    this.dentistas = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM pacientes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("ads: ", res);
      result(null, res);
    });
  };

  findById = (id, result) => {
    connection.query(`SELECT * FROM pacientes WHERE idpaciente LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("ads: ", res);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM pacientes WHERE idpaciente = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("devolver: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };

}
module.exports = PacientesServices;
