const miTabla = document.getElementById("miTabla");
fetch("http://localhost:3000/people/listing/inactivos")
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
        lengthMenu: "Mostrar _MENU_ Persona inactiva por página",
        zeroRecords: "Ningún Persona inactiva encontrado",
        info: "Mostrando _START_ a _END_ Personas inactivas de _TOTAL_ ",
        infoEmpty: "Ningún Persona encontrado",
        infoFiltered: "(filtrados desde _MAX_ Personas inactivas totales)",
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
    window.location.assign("http://127.0.0.1:5500/Cliente/frmpeopleInactivos.html");
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