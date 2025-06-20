 // Variáveis em português
        const iconeUsuario = document.getElementById("usuario");
        const iconeCarrinho = document.getElementById("carrinho");
        const setaEsquerda = document.getElementById("setaEsquerda");
        const setaDireita = document.getElementById("setaDireita");
        const imagensCarrossel = document.querySelectorAll(".imagensCarrossel");
        const bolinhasCarrossel = document.querySelectorAll(".bolinhasCarrossel");
        
        let slideAtual = 0;
        let totalSlides = imagensCarrossel.length;
        let intervaloAutomatico;

        // Função para mostrar slide específico
        function mostrarSlide(indice) {
            // Remove classe ativa de todas as imagens e bolinhas
            imagensCarrossel.forEach(imagem => {
                imagem.classList.remove("ativa");
            });
            bolinhasCarrossel.forEach(bolinha => {
                bolinha.classList.remove("ativa");
            });

            // Adiciona classe ativa ao slide e bolinha atual
            imagensCarrossel[indice].classList.add("ativa");
            bolinhasCarrossel[indice].classList.add("ativa");

            slideAtual = indice;
        }

        // Função para ir para o próximo slide
        function proximoSlide() {
            const proximoIndice = (slideAtual + 1) % totalSlides;
            mostrarSlide(proximoIndice);
        }

        // Função para ir para o slide anterior
        function slideAnterior() {
            const indiceAnterior = (slideAtual - 1 + totalSlides) % totalSlides;
            mostrarSlide(indiceAnterior);
        }

        // Função para ir diretamente para um slide
        function irParaSlide(indice) {
            mostrarSlide(indice);
            reiniciarCarrosselAutomatico();
        }

        // Função para iniciar carrossel automático
        function iniciarCarrosselAutomatico() {
            intervaloAutomatico = setInterval(proximoSlide, 3000);
        }

        // Função para parar carrossel automático
        function pararCarrosselAutomatico() {
            clearInterval(intervaloAutomatico);
        }

        // Função para reiniciar carrossel automático
        function reiniciarCarrosselAutomatico() {
            pararCarrosselAutomatico();
            iniciarCarrosselAutomatico();
        }

        // Event listeners para as setas
        setaEsquerda.addEventListener("click", function() {
            slideAnterior();
            reiniciarCarrosselAutomatico();
        });

        setaDireita.addEventListener("click", function() {
            proximoSlide();
            reiniciarCarrosselAutomatico();
        });

        // Event listeners para os ícones do cabeçalho
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

        // Navegação por teclado
        document.addEventListener("keydown", function(evento) {
            if (evento.key === "ArrowLeft") {
                slideAnterior();
                reiniciarCarrosselAutomatico();
            } else if (evento.key === "ArrowRight") {
                proximoSlide();
                reiniciarCarrosselAutomatico();
            }
        });

        // Suporte a touch para dispositivos móveis
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

            // Verifica se o movimento é mais horizontal que vertical
            if (Math.abs(diferencaX) > Math.abs(diferencaY) && Math.abs(diferencaX) > 50) {
                if (diferencaX > 0) {
                    proximoSlide();
                } else {
                    slideAnterior();
                }
                reiniciarCarrosselAutomatico();
            }
        });

        // Pausa o carrossel quando o mouse está sobre ele
        const faixaCarrossel = document.getElementById("faixaCarrossel");
        faixaCarrossel.addEventListener("mouseenter", pararCarrosselAutomatico);
        faixaCarrossel.addEventListener("mouseleave", iniciarCarrosselAutomatico);

        // Inicia o carrossel automático quando a página carrega
        iniciarCarrosselAutomatico();