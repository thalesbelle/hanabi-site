const iconeUsuario = document.getElementById("usuario");

iconeUsuario.addEventListener("mouseenter", function () {
  iconeUsuario.src = "./icones/usuario-hover.png";
});

iconeUsuario.addEventListener("mouseleave", function () {
  iconeUsuario.src = "./icones/usuario.png";
});