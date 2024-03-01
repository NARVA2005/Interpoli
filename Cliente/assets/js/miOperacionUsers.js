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
  
      <td>${users.photo !== undefined ? `<img src="http://localhost:3000/users/mostrarimagen/${users.photo}" style="max-width: 100px; max-height: 100px;" />` : ""}</td>
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
    $("#datatable").DataTable({
      lengthMenu: [5,10,15,50,100,250,500],
      columnDefs: [
        { orderable: false, targets: [7,8]},
        { searchable: false, targets: [7,8] },
      ],
      pageLength: 5,
      destroy: true,
      language: {
        lengthMenu: "Mostrar _MENU_ Funcionario por página",
        zeroRecords: "Ningún Funcionario encontrado",
        info: "Mostrando _START_ a _END_ Funcionarios de _TOTAL_ ",
        infoEmpty: "Ningún Funcionario encontrado",
        infoFiltered: "(filtrados desde _MAX_ Funcionarios totales)",
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
  function validarFormulario(){
  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const rank = document.getElementById("rank").value;
  const photofilename = document.getElementById("photo").files[0];
  const email = document.getElementById("email").value;

  // Verificar que los campos obligatorios no estén vacíos
  if (!name || !lastname || !rank || !photofilename || !email) {
      Swal.showValidationMessage("Por favor, complete todos los campos.");
      return false; // Detener el envío del formulario si algún campo está vacío
  }

  // Verificar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      Swal.showValidationMessage("Por favor, ingrese un correo electrónico válido.");
      return false;
  }

  // Verificar otros criterios de validación según sea necesario

  // Si todas las validaciones pasan, devuelve true para permitir el envío del formulario
  return true;
}
  function funcionMostrarFormularioUsers(id) {
    Swal.fire({
      title: "Crear Funcionario",
      html: `
          <input type="text" id="name" class="swal2-input" placeholder="Nombre">
          <input type="text" id="lastname" class="swal2-input" placeholder="Apellido">
          <input type="number" id="rank" class="swal2-input" placeholder="Cargo">
          <input type="text" id="email" class="swal2-input" placeholder="Gmail">
          <input type="file" id="photo" class="swal2-input" placeholder="">
        `,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Registrar funcionario",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: () => {
        if (!validarFormulario()) {
          return false;
        }
      
        // Obtener los valores de los campos después de validar el formulario
        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastname").value;
        const rank = document.getElementById("rank").value;
        const photofilename = document.getElementById("photo").files[0];
        const email = document.getElementById("email").value;
              // Verificar el tipo de archivo
      const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
      const extension = photofilename.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        Swal.showValidationMessage("El archivo debe ser de tipo JPG, JPEG, PNG o PDF.");
        return false;
      }
    

        let data = {
          name: name,
          lastname: lastname,
          rank: rank,
          email: email,
        
        };
     
      
        fetch("http://localhost:3000/users/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        .then((response) => {
          if (response.email==email) {
            throw new Error("Error al insertar el usuario.");
          }
          return response.json();
        })
        .then((user) => {
            const userID = user.id;
            const imageData = new FormData();
            imageData.append('photo', photofilename);
      
            return fetch(`http://localhost:3000/users/subirimagen/${userID}`, {
              method: 'PUT',
              body: imageData
            });
          }) .then((response) => {
            if (!response.ok) {
              throw new Error("Error al guardar los datos.");
            }
            Swal.fire({
              title: "¡Éxito!",
              text: "Se agregó correctamente.",
              icon: "success",
            })
          }).catch((error) => {
            console.error("Error al insertar el usuario:", error);
            // Mostrar un mensaje de error al usuario
          });
      },
    })
  }
  
  
/* function handleFileSelect(event, userID) {
 // Obtener el archivo seleccionado
 const photofilename = event.target.files[0];
  
  // Crear un objeto FormData y agregar el archivo
  let imageData = new FormData();
  imageData.append('photo', photofilename);
  
  // Enviar la imagen al servidor
  fetch(`http://localhost:3000/users/subirimagen/${userID}`, {
    method: 'PUT',
    body: imageData
  })
  .then(() => {
    // En este punto, la imagen se ha subido correctamente
    // Mostrar el mensaje de éxito y redirigir
    Swal.fire({
      title: "¡Éxito!",
      text: "Se agregó correctamente.",
      icon: "success",
    });
    window.location.assign("http://127.0.0.1:5500/Cliente/frmUsers.html");
  })
  .catch(error => {
    // Capturar cualquier error que ocurra en el proceso
    console.log(error);
  });
} */


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
