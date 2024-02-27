/*microservicios para crear el crub de los usuarios de la galaxia*/
const express = require("express");

const users = express.Router();
const cnx = require("./bdata");
const multer = require("multer");
const path = require("path");



/*Desarrollo del CRUD*/
//Consultar


users.get("/users/listing/activos", (req, res) => {
  let sql = "select*from user where estado='activo'";
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
users.get("/users/listing/inactivo", (req, res) => {
  let sql = "select*from user where estado='inactivo'";
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
users.get("/users/listing/BuscarCorreo/:email", (req, res) => {
  let email = req.params.email;
  let sql = "SELECT email FROM user WHERE email = ? ";
  cnx.query(sql, [email], (error, data) => {
      if (error) {
          console.error("Error al buscar el correo electrónico:", error);
          res.status(500).send("Error interno del servidor al buscar el correo electrónico.");
      } else {
          if (data.length > 0) {
              res.status(200).send({ email: true }); // El correo electrónico existe
          } else {
              res.status(200).send({ email: false }); // El correo electrónico no existe
          }
      }
  });
});

//Consultar por ID
users.get("/users/listing/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM user WHERE id =${id}  ORDER BY lastname`;
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
    rank: req.body.rank,
    email: req.body.email,

  };
  cnx.query("insert into user set ?", frmdata, (error, data) => {
    try {
      res.status(200).send("Insercion exitosa!!");
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
    }
  });
});

//Actualizar un rsolo registro por estado
users.put("/users/updateUnoEstado/:id", (req, res) => {
  let id = req.params.id; //parametro
  let frmdata = {
    estado: req.body.estado,
  };
  cnx.query("update user set? where id=?", [frmdata, id], (error, data) => {
    try {
      res.status(200).send("Actualizacion exitosa!!");
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
    rank: req.body.rank,
    email: req.body.email,
  
  };
  cnx.query("update user set? where id=?", [frmdata, id], (error, data) => {
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
  let sql = `delete from user where id=${id}`;

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
