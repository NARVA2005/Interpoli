/*microservicios para crear el crub del historial dilictivo de las personas de la galaxía*/

const express = require("express");
const history = express.Router();
const cnx = require("./bdata");
/*Desarrollo del CRUD*/
//Consultar
history.get("/history/listing", (req, res) => {
  let sql =
    "SELECT history.id, history.description, history.date, history.note,people.id, people.name AS culpable, history.estado FROM history INNER JOIN people ON history.id_people = people.id";
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
history.get("/history/listing/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM history WHERE id =${id}`;
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

//insertar un antecedente

history.post("/history/create", (req, res) => {
  let frmdata = {
    description: req.body.description,
    date: req.body.date,
    note: req.body.note,
    id_people: req.body.id_people,
  };
  cnx.query("insert into history set ?", frmdata, (error, data) => {
    try {
      res.status(200).send("Insercion exitosa!!");
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
    }
  });
});

//Actualizar un registro
history.put("/history/update/:id", (req, res) => {
  let id = req.params.id; //parametro
  let frmdata = {
    description: req.body.description,
    date: req.body.date,
    note: req.body.note,
    id_people:req.body.id_people,
    estado:req.body.estado
  };
  cnx.query("update history set? where id=?", [frmdata, id], (error, data) => {
    try {
      res.status(200).send("Actualizacion exitosa!!");
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
    }
  });
});
//Actualizar un rsolo registro por estado
history.put("/history/updateUnoEstado/:id", (req, res) => {
  let id = req.params.id; //parametro
  let frmdata = {
    estado:req.body.estado
  };
  cnx.query("update history set? where id=?", [frmdata, id], (error, data) => {
    try {
      res.status(200).send("Actualizacion exitosa!!");
    } catch (error) {
      console.log(error);
      throw `hay un error en la consulta${error}`;
    }
  });
});
//Eliminar por ID
//eliminar fisico de la base de datos
//eliminar logico
history.delete("/history/deleteid/:id", (req, res) => {
  let id = req.params.id;
  let sql = `delete from history where id=${id}`;

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
module.exports = history;
