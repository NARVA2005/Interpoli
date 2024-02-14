/*microservicios para crear el crub de los usuarios de la galaxia*/
const express = require("express");

const users = express.Router();
const cnx = require("./bdata");
/*Desarrollo del CRUD*/
//Consultar
users.get("/users/listing", (req, res) => {
  let sql = "select*from users order by lastname ";
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
users.get("/users/listing/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM users WHERE id =${id}  ORDER BY lastname`;
  //cnx.query(`SELECT * FROM people WHERE id =${id}  ORDER BY lastname`, (error, data) => {
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

users.post("/users/create", (req, res) => {
  let frmdata = {
    name: req.body.name,
    lastname: req.body.lastname,
    position: req.body.position,
    email: req.body.email,
    password: req.body.password,
    photo: req.body.photo,
  };
  cnx.query("insert into users set ?", frmdata, (error, data) => {
    try {
      res.status(200).send("Insercion exitosa!!");
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
    }
  });
});

//Actualizar un registro
users.put("/users/update/:id", (req, res) => {
  let id = req.params.id; //parametro
  let frmdata = {
    name: req.body.name,
    lastname: req.body.lastname,
    position: req.body.position,
    email: req.body.email,
    password: req.body.password,
    photo: req.body.photo,
  };
  cnx.query("update users set? where id=?", [frmdata, id], (error, data) => {
    try {
      res.status(200).send("Actualizacion exitosa!!");
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
    }
  });
});
//Eliminar por ID
users.delete("/users/deleteid/:id", (req, res) => {
  let id = req.params.id;
  let sql = `delete from users where id=${id}`;

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
module.exports = users;
