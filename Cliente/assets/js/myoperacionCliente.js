const miTabla = document.getElementById("miTabla");
fetch("http://localhost:3000/people/listing/activos")
  .then((res) => res.json()) // Agrega paréntesis para llamar a la función json()
  .then((reportados) => {
    reportados.map((cliente) => {
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
    $("#datatable").DataTable({
      lengthMenu: [5,10,15,50,100,250,500],
      columnDefs: [
        { orderable: false, targets: [7,8]},
        { searchable: false, targets: [7,8] },
      ],
      pageLength: 5,
      destroy: true,
      language: {
        lengthMenu: "Mostrar _MENU_ Cliente por página",
        zeroRecords: "Ningún Cliente encontrado",
        info: "Mostrando _START_ a _END_ Cliente de _TOTAL_ ",
        infoEmpty: "Ningún Cliente encontrado",
        infoFiltered: "(filtrados desde _MAX_ Clientes totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
          first: "<<",
          last: ">>",
          next: ">",
          previous: "<",
        },
      },
    });
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));
function funcionMostrarFormularioPeople() {
  Swal.fire({
    title: "Reportes Espaciales",
    html: `
        <input type="text" id="name" class="swal2-input" placeholder="Nombre">
        <input type="text" id="lastname" class="swal2-input" placeholder="Apellido" >
        <input type="text" id="nickname" class="swal2-input" placeholder="Alias" >
        <input type="text" id="email" class="swal2-input" placeholder="Gmail" >
        <input type="number" id="type" class="swal2-input" placeholder="Tipo" >
      `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Registrar Usuario ilegal",
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: () => {
      const name = document.getElementById("name").value;
      const lastname = document.getElementById("lastname").value;
      const nickname = document.getElementById("nickname").value;
      const email = document.getElementById("email").value;
      const type = document.getElementById("type").value;

      if (!name || !lastname || !nickname || !email || !type) {
        Swal.showValidationMessage("Por favor, complete todos los campos.");
        return false; // Detener el envío del formulario si algún campo está vacío
      } else {
        let data = {
          name: name,
          lastname: lastname,
          nickname: nickname,
          email: email,
          type:type,
        };

        return fetch("http://localhost:3000/people/create", {
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
                "http://127.0.0.1:5500/Cliente/login.html"
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
  window.location.assign("http://127.0.0.1:5500/Cliente/login.html");
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

function btnEditar(id, nombre, apellido, alias, gmail, tipo) {
  Swal.fire({
    title: "Reportes Espacial de usuarios",
    html: `
        <input type="text" id="name" class="swal2-input" placeholder="Nombre" value="${nombre}">
        <input type="text" id="lastname" class="swal2-input" placeholder="Apellido" value="${apellido}">
        <input type="text" id="nickname" class="swal2-input" placeholder="Alias"  value="${alias}">
        <input type="text" id="email" class="swal2-input" placeholder="Gmail" value="${gmail}">
        <input type="text" id="type" class="swal2-input" placeholder="Tipo"  value="${tipo}">
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
      const nickname = document.getElementById("nickname").value;
      const email = document.getElementById("email").value;
      const type = document.getElementById("type").value;

      if (!name || !lastname || !nickname || !email || !type) {
        Swal.showValidationMessage("Por favor, complete todos los campos.");
      } else {
        const data = {
          name: name,
          lastname: lastname,
          nickname: nickname,
          email: email,
          type: type,
        };
        return fetch(`http://localhost:3000/people/update/${id}`, {
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
                "http://127.0.0.1:5500/Cliente/login.html"
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
