
const miTabla = document.getElementById("miTabla");

fetch("http://localhost:3000/users/listing/inactivo")
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
        lengthMenu: "Mostrar _MENU_ Funcionario inactivo por página",
        zeroRecords: "Ningún Funcionario inactivo encontrado",
        info: "Mostrando _START_ a _END_ Funcionarios inactivos de _TOTAL_ ",
        infoEmpty: "Ningún Funcionario encontrado",
        infoFiltered: "(filtrados desde _MAX_ Funcionarios inactivos totales)",
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