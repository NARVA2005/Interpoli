const miTabla = document.getElementById("miTabla");

fetch("http://localhost:3000/history/listing")
  .then((res) => res.json())
  .then((Peliculas) => {
    Peliculas.map((history) => {
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
      }</td>
      <td><button type="submit" class="btnBorrar" onclick="btnBorrar('${
        history.id
      }','${history.estado}')">Cambiar estado</button></td>
      <td><button type="submit" class="btnEditar" onclick="btnEditar('${
        history.id
      }', '${history.description}', '${history.date}', '${history.note}', '${
        history.culpable
      }')">Editar</button></td></tr>`;

      miTabla.innerHTML += fila;
    });
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));

function funcionMostrarFormulario() {
  Swal.fire({
    title: "Reportes Espaciales",
    html: `
        <input type="text" id="description" class="swal2-input" placeholder="Descripcion">
        <input type="date" id="date" class="swal2-input" placeholder="" >
        <input type="text" id="note" class="swal2-input" placeholder="Nota" >
        <input type="number" id="id_people" class="swal2-input" placeholder="Culpable" >
      `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Registrar reporte",
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: () => {
      const date = document.getElementById("date").value;
      const description = document.getElementById("description").value;
      const note = document.getElementById("note").value;
      const id_people = document.getElementById("id_people").value;
      
      // Verificar si algún campo está vacío
      if (!date || !description || !note || !id_people) {
        Swal.showValidationMessage("Por favor, complete todos los campos.");
        return false; // Detener el envío del formulario si algún campo está vacío
      } else {
        // Hacer una solicitud para obtener los datos de las personas
        return fetch("http://localhost:3000/people/listing")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener los datos de las personas.");
            }
            return response.json();
          })
          .then((peopleData) => {
            // Verificar si el id_people existe y el estado del usuario es activo
            const idExists = peopleData.some((person) => person.id === parseInt(id_people));
            const isActive = peopleData.some((person) => person.id === parseInt(id_people) && person.estado === "activo");
    
            if (!idExists) {
              Swal.showValidationMessage("El id especificado no existe.");
              return false; // Detener el envío del formulario si el id_people no existe
            } else if (!isActive) {
              Swal.showValidationMessage("El estado del usuario está inactivo.");
              return false; // Detener el envío del formulario si el estado del usuario no es activo
            }
    
            // Si todo está bien, preparar los datos para enviar
            let data = {
              description: description,
              date: date,
              note: note,
              id_people: id_people,
            };
    
            // Enviar la solicitud para crear el historial
            return fetch("http://localhost:3000/history/create", {
              method: "POST",
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
                text: "Se agregó correctamente.",
                icon: "success",
              }).then(() => {
                window.location.assign("http://127.0.0.1:5500/Cliente/historial.html");
              });
            })
            .catch((error) => {
              console.log(error);
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
    
  });
}
//funcion para eliminar la historia por uno

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
  window.location.assign("http://127.0.0.1:5500/Cliente/historial.html");

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

// Esta función se llama cuando se quiere editar la historia

function btnEditar(id, descri, fechaIngresada, nota, bb) {
  const formattedDate = new Date(fechaIngresada).toISOString().split("T")[0];

  Swal.fire({
    title: "Editar reporte espacial",
    html: `
      <input type="text" id="description" class="swal2-input" placeholder="Descripcion" value="${descri}">
      <input type="date" id="fecha" class="swal2-input" placeholder="Fecha" value="${formattedDate}">
      <input type="text" id="nota" class="swal2-input" placeholder="Nota" value="${nota}">
      <input type="text" id="culpablex" class="swal2-input" placeholder="Culpable" value="${bb}" disabled>
    `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Actualizar reporte",
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: () => {
      const description = document.getElementById("description").value;
      const date = document.getElementById("fecha").value; // La fecha ya está en formato ISO 8601 (YYYY-MM-DD)
      const note = document.getElementById("nota").value;

      if (!description || !date || !note) {
        Swal.showValidationMessage("Por favor, complete todos los campos.");
      } else {
        const data = {
          description: description,
          date: date,
          note: note,
        };

        return fetch(`http://localhost:3000/history/update/${id}`, {
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
                "http://127.0.0.1:5500/Cliente/historial.html"
              );
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  }).catch((error) => {
    console.error(error);
  });
}
