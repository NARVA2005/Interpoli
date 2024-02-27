let btnConfirmar = document.getElementById("submit");
btnConfirmar.addEventListener('click', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim(); // Elimina espacios en blanco al principio y al final del correo electrónico

    if (!email) {
        alert('Campo de correo electrónico vacío');
        return;
    }

    fetch(`http://localhost:3000/users/listing/BuscarCorreo/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error en la solicitud");
        }
    })
    .then((data) => {
        if (data && data.email !== undefined) {
            if (data.email === true) {
                window.location.assign("http://127.0.0.1:5500/Cliente/login.html");
            } else {
                alert(`El correo ${email} no existe.`);
            }
        } else {
            throw new Error("Respuesta inesperada del servidor");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.");
    });
});
