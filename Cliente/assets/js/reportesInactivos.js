const miTabla = document.getElementById("miTabla");
fetch("http://localhost:3000/history/listing/inactivos")
  .then((res) => res.json())
  .then((Peliculas) => {
    Peliculas.map((history) => {
      let fila = `<tr><td>${
        history.id !== undefined ? history.id : ""
      }</td><td>${
        history.description !== undefined ? history.description : ""
      }</td> <td>${history.date != undefined ? history.date.substring(0,10) : ""}</td>  <td>${
        history.note !== undefined ? history.note : ""
      }</td> <td>${
        history.culpable !== undefined ? history.culpable : ""
      }</td><td>${history.bb !== undefined ? history.bb : ""}</td><td>${
        history.estado !== undefined ? history.estado : ""
      }</td>
      <td><button type="submit" class="btnBorrar" onclick="btnBorrar('${
        history.id
      }','${history.estado}')">Cambiar estado</button></td>
     </tr>`;

      miTabla.innerHTML += fila;
    });
    $("#datatable").DataTable({
      lengthMenu: [5,10,15,50,100,250,500],
      columnDefs: [
        { orderable: false, targets: [6,7]},
        { searchable: false, targets: [6,7] },
      ],
      pageLength: 5,
      destroy: true,
      language: {
        lengthMenu: "Mostrar _MENU_ historial por página",
        zeroRecords: "Ningún historial encontrado",
        info: "Mostrando _START_ a _END_ historiales de _TOTAL_ ",
        infoEmpty: "Ningún historial encontrado",
        infoFiltered: "(filtrados desde _MAX_ historiales totales)",
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