let abrirRegistro = () => {
  window.open("registro.html", "_self");
};


let valor = 1;

if (valor === 1) {
  Swal.fire({
    title: "Correcto!",
    text: "Do you want to continue",
    icon: "success",
    confirmButtonText: "Cool",
  });

  // window.open("registro.html");
} else {
  Swal.fire({
    title: "Error!",
    text: "Do you want to continue",
    icon: "error",
    confirmButtonText: "Cool",
  });
}
