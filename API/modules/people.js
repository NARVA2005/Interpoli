/*microservicios para crear el crub de las personas de la galaxia*/
const express = require("express");

const people = express.Router();
const cnx = require("./bdata");
/*Desarrollo del CRUD*/
//Consultar
people.get("/people/listing/activos", (req, res) => {
  let sql =
    "SELECT id, estado, name, lastname,nickname, email, type FROM people where estado='activo'";
  cnx.query(sql, (error, data) => {
    try {
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      /*   res.status(404).send({
        id:error.id,
        mensaje:error.message,
    }); */
    }
  });
});
//Consultar
people.get("/people/listing/inactivos", (req, res) => {
  let sql =
    "SELECT id, estado, name, lastname,nickname, email, type FROM people where estado='inactivo'";
  cnx.query(sql, (error, data) => {
    try {
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      /*   res.status(404).send({
        id:error.id,
        mensaje:error.message,
    }); */
    }
  });
});
//Consultar por ID
people.get("/people/listing/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT id, estado, name, lastname, nickname, email, type from people where id=${id}`;
  cnx.query(sql, (error, data) => {
    try {
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
      /*   res.status(404).send({
          id:error.id,
          mensaje:error.message,
      }); */
    }
  });
});
//insertar una persona

people.post("/people/create", (req, res) => {
  let frmdata = {
    name: req.body.name,
    lastname: req.body.lastname,
    nickname: req.body.nickname,
    email: req.body.email,
    type: req.body.type,
  };
  cnx.query("insert into people set ?", frmdata, (error, data) => {
    try {
      res.status(200).send("Insercion exitosa!!");
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
    }
  });
});

//Actualizar un registro
people.put("/people/update/:id", (req, res) => {
  let id = req.params.id; //parametro
  let frmdata = {
    name: req.body.name,
    lastname: req.body.lastname,
    nickname: req.body.nickname,
    email: req.body.email,
    type: req.body.type,
  };
  cnx.query("update people set? where id=?", [frmdata, id], (error, data) => {
    try {
      res.status(200).send("Actualizacion exitosa!!");
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
    }
  });
});
//Actualizar un rsolo registro por estado
people.put("/people/updateUnoEstado/:id", (req, res) => {
  let id = req.params.id; //parametro
  let frmdata = {
    estado: req.body.estado,
  };
  cnx.query("update people set? where id=?", [frmdata, id], (error, data) => {
    try {
      res.status(200).send("Actualizacion exitosa!!");
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
    }
  });
});
//Eliminar por ID
people.delete("/people/deleteid/:id", (req, res) => {
  let id = req.params.id;
  let sql = `delete from people where id=${id}`;

  cnx.query(sql, (error, data) => {
    try {
      res.status(200).send("borrado exitoso");
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
      /*   res.status(404).send({
            id:error.id,
            mensaje:error.message,
        }); */
    }
  });
});
module.exports = people;
