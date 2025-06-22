const iconeUsuario = document.getElementById("usuario");
const iconeCarrinho = document.getElementById("carrinho");
const setaEsquerda = document.getElementById("setaEsquerda");
const setaDireita = document.getElementById("setaDireita");
const imagensCarrossel = document.querySelectorAll(".imagensCarrossel");
const bolinhasCarrossel = document.querySelectorAll(".bolinhasCarrossel");
const menuUsuario = document.getElementById("menuUsuario");
        
let slideAtual = 0;
let totalSlides = imagensCarrossel.length;
let intervaloAutomatico;

function mostrarSlide(indice) {
    imagensCarrossel.forEach(imagem => {
        imagem.classList.remove("ativa");
    });
    bolinhasCarrossel.forEach(bolinha => {
        bolinha.classList.remove("ativa");
    });

            imagensCarrossel[indice].classList.add("ativa");
            bolinhasCarrossel[indice].classList.add("ativa");

            slideAtual = indice;
        }

        function proximoSlide() {
            const proximoIndice = (slideAtual + 1) % totalSlides;
            mostrarSlide(proximoIndice);
        }

        function slideAnterior() {
            const indiceAnterior = (slideAtual - 1 + totalSlides) % totalSlides;
            mostrarSlide(indiceAnterior);
        }

        function irParaSlide(indice) {
            mostrarSlide(indice);
            reiniciarCarrosselAutomatico();
        }

        function iniciarCarrosselAutomatico() {
            intervaloAutomatico = setInterval(proximoSlide, 4000);
        }

        function pararCarrosselAutomatico() {
            clearInterval(intervaloAutomatico);
        }

        function reiniciarCarrosselAutomatico() {
            pararCarrosselAutomatico();
            iniciarCarrosselAutomatico();
        }

        setaEsquerda.addEventListener("click", function() {
            slideAnterior();
            reiniciarCarrosselAutomatico();
        });

        setaDireita.addEventListener("click", function() {
            proximoSlide();
            reiniciarCarrosselAutomatico();
        });

        iconeUsuario.addEventListener("mouseenter", function () {
            iconeUsuario.src = "./icones/usuario-hover.png";
        });

        iconeUsuario.addEventListener("mouseleave", function () {
            iconeUsuario.src = "./icones/usuario.png";
        });

        iconeCarrinho.addEventListener("mouseenter", function () {
            iconeCarrinho.src = "./icones/carrinho-hover.png";
        });

        iconeCarrinho.addEventListener("mouseleave", function () {
            iconeCarrinho.src = "./icones/carrinho.png";
        });

        document.addEventListener("keydown", function(evento) {
            if (evento.key === "ArrowLeft") {
                slideAnterior();
                reiniciarCarrosselAutomatico();
            } else if (evento.key === "ArrowRight") {
                proximoSlide();
                reiniciarCarrosselAutomatico();
            }
        });

        let inicioToqueX = 0;
        let inicioToqueY = 0;

        document.addEventListener("touchstart", function(evento) {
            inicioToqueX = evento.touches[0].clientX;
            inicioToqueY = evento.touches[0].clientY;
        });

        document.addEventListener("touchend", function(evento) {
            const fimToqueX = evento.changedTouches[0].clientX;
            const fimToqueY = evento.changedTouches[0].clientY;
            const diferencaX = inicioToqueX - fimToqueX;
            const diferencaY = inicioToqueY - fimToqueY;

            if (Math.abs(diferencaX) > Math.abs(diferencaY) && Math.abs(diferencaX) > 50) {
                if (diferencaX > 0) {
                    proximoSlide();
                } else {
                    slideAnterior();
                }
                reiniciarCarrosselAutomatico();
            }
        });

        const faixaCarrossel = document.getElementById("faixaCarrossel");
        faixaCarrossel.addEventListener("mouseenter", pararCarrosselAutomatico);
        faixaCarrossel.addEventListener("mouseleave", iniciarCarrosselAutomatico);

        iniciarCarrosselAutomatico();

        iconeUsuario.addEventListener("click", () => {
            menuUsuario.toggleAttribute('hidden');
        });