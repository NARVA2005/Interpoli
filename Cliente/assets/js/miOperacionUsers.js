const miTabla = document.getElementById("miTabla");
fetch("http://localhost:3000/users/listing/activos")
  .then((res) => res.json()) // Agrega paréntesis para llamar a la función json()
  .then((reportados) => {
    reportados.map((users) => {
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
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));
function funcionMostrarFormularioPeople() {
  Swal.fire({
    title: "Crear Funcionario",
    html: `
        <input type="text" id="name" class="swal2-input" placeholder="Nombre">
        <input type="text" id="lastname" class="swal2-input" placeholder="Apellido" >
        <input type="number" id="rank" class="swal2-input" placeholder="Cargo" >
        <input type="text" id="email" class="swal2-input" placeholder="Gmail" >
   

      `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Registrar funcionario",
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: () => {
      const name = document.getElementById("name").value;
      const lastname = document.getElementById("lastname").value;
      const rank = document.getElementById("rank").value;
      const email = document.getElementById("email").value;
    


      if (!name || !lastname || !rank || !email) {
        Swal.showValidationMessage("Por favor, complete todos los campos.");
        return false; // Detener el envío del formulario si algún campo está vacío
      } else {
        let data = {
          name: name,
          lastname: lastname,
          rank: rank,
          email: email,
        };

        return fetch("http://localhost:3000/users/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al guardar los datos.");
            }
            Swal.fire({
              title: "¡Éxito!",
              text: "Se agregó correctamente.",
              icon: "success",
            }).then(() => {
              window.location.assign(
                "http://127.0.0.1:5500/Cliente/frmUsers.html"
              );
            });
          })
          .catch((error) => {
            console.log(error);
          })

          .catch((error) => {
            console.log(error);
          });
      }
    },
  });
}
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
  window.location.assign("http://127.0.0.1:5500/Cliente/frmUsers.html");
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

function btnEditar(id, nombre, apellido, cargo, gmail) {
  Swal.fire({
    title: "Reportes Espacial de usuarios",
    html: `
        <input type="text" id="name" class="swal2-input" placeholder="Nombre" value="${nombre}">
        <input type="text" id="lastname" class="swal2-input" placeholder="Apellido" value="${apellido}">
        <input type="number" id="rank" class="swal2-input" placeholder="Alias"  value="${cargo}">
        <input type="text" id="email" class="swal2-input" placeholder="Gmail" value="${gmail}">
      `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Actualizar persona",
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: () => {
      const name = document.getElementById("name").value;
      const lastname = document.getElementById("lastname").value;
      const rank = document.getElementById("rank").value;
      const email = document.getElementById("email").value;

      if (!name || !lastname || !rank || !email ) {
        Swal.showValidationMessage("Por favor, complete todos los campos.");
      } else {
        const data = {
          name: name,
          lastname: lastname,
          rank: rank,
          email: email,
        };
        return fetch(`http://localhost:3000/users/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al actualizar el dato del elemento.");
            }

            Swal.fire({
              title: "¡Éxito!",
              text: "La edición se ha completado correctamente.",
              icon: "success",
            }).then(() => {
              window.location.assign(
                "http://127.0.0.1:5500/Cliente/frmUsers.html"
              );
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  }).catch((error) => {
    console.log(error);
  });
}
