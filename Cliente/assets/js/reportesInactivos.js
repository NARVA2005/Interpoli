const miTabla = document.getElementById("miTabla");
let rows=0;
fetch("http://localhost:3000/history/listinEstadoInactivo")
  .then((res) => res.json())
  .then((Peliculas) => {
    Peliculas.map((history) => {
      rows++;
      let fila = `<tr><td>${
        history.id !== undefined ? history.id : ""
      }</td><td>${
        history.description !== undefined ? history.description : ""
      }</td> <td>${history.date !== undefined ? history.date : ""}</td>  <td>${
        history.note !== undefined ? history.note : ""
      }</td> <td>${
        history.culpable !== undefined ? history.culpable : ""
      }</td><td>${history.bb !== undefined ? history.bb : ""}</td><td>${
        history.estado !== undefined ? history.estado : ""
      }</td> <td><button type="submit" class="btnBorrar" onclick="btnBorrar('${
        history.id
      }','${history.estado}')">Cambiar estado</button></td>
     </tr>`;

      miTabla.innerHTML += fila;
    });
    if(rows==0){
// la tabla no tiene filas
  
miTabla.innerHTML = `
<tr>
  <td colspan="7">
    <p>No se encontraron datos para mostrar</p> 
    <img src="https://static.vecteezy.com/system/resources/previews/003/105/011/non_2x/no-data-and-lose-data-vector.jpg" class="imgendeFilasVacias">
  </td>
</tr>
`;
    }
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));
  function btnBorrar(id, estadoUsuario) {
    let descript = {};
    if (estadoUsuario == "activo") {
      descript = {
        estado: "inactivo",
      };
    } else {
      descript = {
        estado: "activo",
      };
    }
    window.location.assign("http://127.0.0.1:5500/Cliente/frmReportesInactivos.html");
    fetch(`http://localhost:3000/history/updateUnoEstado/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(descript),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al actualizar el estado del elemento.");
        }
      })
      .then((data) => {
        const nuevoEstado = data.nuevoEstado;
        console.log(
          `Estado del elemento con ID ${id} actualizado a ${nuevoEstado}.`
        );
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del elemento:", error);
      });
    console.log(id);
  }