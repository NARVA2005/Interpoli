const miTabla = document.getElementById("miTabla");
let rows=0;
fetch("http://localhost:3000/people/listing/inactivos")
  .then((res) => res.json()) // Agrega paréntesis para llamar a la función json()
  .then((reportados) => {
    reportados.map((cliente) => {
        rows++;
      let fila = `<tr>
      <td>${cliente.id !== undefined ? cliente.id : ""}</td>
      <td>${cliente.name !== undefined ? cliente.name : ""}</td>
      <td>${cliente.lastname !== undefined ? cliente.lastname : ""}</td>
      <td>${cliente.nickname !== undefined ? cliente.nickname : ""}</td>
      <td>${cliente.email !== undefined ? cliente.email : ""}</td>
      <td>${cliente.type !== undefined ? cliente.type : ""}</td>
      <td>${cliente.estado !== undefined ? cliente.estado : ""}</td>
      <td><button type="submit" class="btnBorrar" onclick="btnBorrar('${
        cliente.id
      }','${cliente.estado}')">Cambiar estado</button></td>
      <td><button type="submit" class="btnEditar" onclick="btnEditar('${
        cliente.id
      }', '${cliente.name}', '${cliente.lastname}', '${cliente.nickname}', '${
        cliente.email
      }','${cliente.type}')"">Editar</button></td>
    </tr>`;
      miTabla.innerHTML += fila;
    });
    if(rows==0){
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
    window.location.assign("http://127.0.0.1:5500/Cliente/frmInactivosUsers.html");
    fetch(`http://localhost:3000/people/updateUnoEstado/${id}`, {
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