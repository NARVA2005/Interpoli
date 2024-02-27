/*microservicios para crear el crub del historial dilictivo de las personas de la galaxía*/

const express = require("express");
const history = express.Router();
const cnx = require("./bdata");
/*Desarrollo del CRUD*/
//Consultar
history.get("/history/listing/activos", (req, res) => {
  let sql =
    "SELECT history.id, history.description, history.date, history.note,people.id as bb, people.name AS culpable, history.estado FROM history INNER JOIN people ON history.id_people = people.id where history.estado='activo'";
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
history.get("/history/listing/inactivos", (req, res) => {
  let sql =
    "SELECT history.id, history.description, history.date, history.note,people.id as bb, people.name AS culpable, history.estado FROM history INNER JOIN people ON history.id_people = people.id where history.estado='inactivo'";
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
history.get("/history/listinUno/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT 
  history.description, history.date, history.note,history.id_people
 FROM history JOIN people  ON history.id = people.id
 WHERE history.id = ${id}`;
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
history.get("/history/listinEstadoInactivo", (req, res) => {

  let sql =
          "SELECT history.id, history.description, history.date, history.note,people.id as bb, people.name AS culpable, history.estado FROM history INNER JOIN people ON history.id_people = people.id WHERE history.estado='inactivo'";
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
/* //para colocar toda la tabla de historia
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
//}
//});
//}); */
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
  let id = req.params.id;
  let frmdata = {
    description: req.body.description,
    date: req.body.date,
    note: req.body.note,
  };
  
  cnx.query("UPDATE history SET ? WHERE id=?", [frmdata, id], (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" }); // Devuelve un objeto JSON con un mensaje de error
      return;
    }
    
    res.status(200).json({ message: "¡Actualización exitosa!" }); // Devuelve un objeto JSON con un mensaje de éxito
  });
});


//Actualizar un rsolo registro por estado
history.put("/history/updateUnoEstado/:id", (req, res) => {
  let id = req.params.id; //parametro
  let frmdata = {
    estado: req.body.estado,
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
