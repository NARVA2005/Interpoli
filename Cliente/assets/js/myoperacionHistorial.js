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
      }</td><td>${history.id !== undefined ? history.id : ""}</td><td>${
        history.estado !== undefined ? history.estado : ""
      }</td>
      <td><button type="submit" class="btnBorrar" onclick="btnBorrar()">Eliminar</button></td>
      <td><button type="submit" class="btnEditar"onclick="btnEditar()">Editar</button></td></tr>`;

      miTabla.innerHTML += fila;
    });
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));

function funcionMostrarFormulario() {
  Swal.fire({
    title: "Reportes Espacial",
    html: `
     
      
        <input type="text" id="description" class="swal2-input" placeholder="Descripcion">
        <input type="text" id="note" class="swal2-input" placeholder="Nota">
        <input type="date" id="date" class="swal2-input" placeholder="">
      
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

      if (!date || !description || !note) {
        Swal.showValidationMessage("Por favor, complete todos los campos.");
      } else {
        return { date, description, note };
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí puedes utilizar los datos ingresados por el usuario
      const { date, description, note } = result.value;
      // Luego puedes registrar el reporte o realizar cualquier otra acción
      Swal.fire({
        title: "¡Reporte registrado!",
        text: "El reporte ha sido registrado con éxito.",
        icon: "success",
      });
    }
  });
}
//funcion para eliminar la historia por uno

// Esta función se llama cuando se hace clic en el botón de eliminar
function btnBorrar() {
  fetch(`http://localhost:3000/history/updateUnoEstado/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }), // Envía el ID al servidor
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Recibe la respuesta del servidor
      } else {
        throw new Error("Error al actualizar el estado del elemento.");
      }
    })
    .then((data) => {
      // El servidor debería devolver el nuevo estado actualizado
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

// Llamar a la función para cargar la tabla cuando se carga la página

/*  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Desea cambiar el estado de la historia",
      text: "El estado no es permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "si, Desactivar!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "El estado ha cambiado!",
          text: "",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
//  result.dismiss === Swal.DismissReason.cancel
// ) {
//swalWithBootstrapButtons.fire({
//title: "Cancelled",
//text: "Your imaginary file is safe :)",
//  icon: "error",
//  });
// }
/* }); */
//}

function btnEditar() {
  Swal.fire({
    title: "Reportes Espacial",
    html: `
         
          
            <input type="text" id="description" class="swal2-input" placeholder="Descripcion">
            <input type="date" id="fecha" class="swal2-input" placeholder="Fecha">
            <input type="text" id="nota" class="swal2-input" placeholder="Nota">
            <input type="number" id="culpablex" class="swal2-input" placeholder="culpable">
          `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Registrar reporte",
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: () => {
      const Descripcion = document.getElementById("description").value;
      const fecha = document.getElementById("fecha").value;
      const note = document.getElementById("nota").value;
      const culpable = document.getElementById("culpablex").value;
      if (!Descripcion || !fecha || !note || !culpable) {
        Swal.showValidationMessage("Por favor, complete todos los campos.");
      } else {
        return { Descripcion, fecha, note, culpable };
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí puedes utilizar los datos ingresados por el usuario
      const { Descripcion, fecha, note, culpable } = result.value;
      // Luego puedes registrar el reporte o realizar cualquier otra acción
      Swal.fire({
        title: "¡Reporte registrado!",
        text: "El reporte ha sido registrado con éxito.",
        icon: "success",
      });
    }
  });
}
