const miTabla = document.getElementById("miTabla");
let rows=0;
fetch("http://localhost:3000/users/listing/inactivo")
  .then((res) => res.json()) // Agrega paréntesis para llamar a la función json()
  .then((reportados) => {
    reportados.map((users) => {
        rows++;
      let fila = `<tr>
      <td>${users.id !== undefined ? users.id : ""}</td>
      <td>${users.name !== undefined ? users.name : ""}</td>
      <td>${users.lastname !== undefined ? users.lastname : ""}</td>
      <td>${users.rank !== undefined ? users.rank : ""}</td>
      <td>${users.email !== undefined ? users.email : ""}</td>
  
      <td>${users.photo !== undefined ? users.photo : ""}</td>
      <td>${users.estado !== undefined ? users.estado : ""}</td>
     
      <td><button type="submit" class="btnBorrar" onclick="btnBorrar('${
        users.id
      }','${users.estado}')">Cambiar estado</button></td>
      <td><button type="submit" class="btnEditar" onclick="btnEditar('${
        users.id
      }', '${users.name}', '${users.lastname}', '${users.rank}', '${
        users.email
      }','${users.type}')"">Editar</button></td>
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
  // Esta función se llama cuando se hace clic en el botón de eliminar
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
    window.location.assign("http://127.0.0.1:5500/Cliente/frmInactivosUsers.html");
    fetch(`http://localhost:3000/users/updateUnoEstado/${id}`, {
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