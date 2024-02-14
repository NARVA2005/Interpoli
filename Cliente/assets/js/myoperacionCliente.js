const miTabla = document.getElementById("miTabla");
fetch("http://localhost:3000/people/listing")
  .then((res) => res.json()) // Agrega paréntesis para llamar a la función json()
  .then((Peliculas) => {
    Peliculas.map((cliente) => {
      let fila = `<tr>
      <td>${cliente.id}</td>
      <td>${cliente.name}</td>
      <td>${cliente.lastname}</td>
      <td>${cliente.nickname}</td>
      <td>${cliente.email}</td>
      <td>${cliente.type}</td>
      <td><button type="submit" class="btnBorrar" onclick="btnBorrar()">Eliminar</button></td>
      <td><button type="submit" class="btnEditar" onclick="btnEditar()">Editar</button></td>
    </tr>`;
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
function btnBorrar() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Desea eliminar la historia",
      text: "El borrado es permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}
function btnEditar() {
  Swal.fire({
    title: "Reportes Espacial",
    html: `
     
      
        <input type="text" id="description" class="swal2-input" placeholder="Nombre">
        <input type="text" id="note" class="swal2-input" placeholder="Apellido">
        <input type="text" id="date" class="swal2-input" placeholder="Alias">
        <input type="text" id="note" class="swal2-input" placeholder="Gmail">
        <input type="text" id="date" class="swal2-input" placeholder="Tipo">
      `,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Editar reporte",
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
