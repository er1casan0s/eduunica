// Carrossel JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.slide');
            const indicators = document.querySelectorAll('.indicator');
            const prevBtn = document.querySelector('.carousel-prev');
            const nextBtn = document.querySelector('.carousel-next');
            let currentSlide = 0;
            let slideInterval;

            function showSlide(n) {
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                currentSlide = (n + slides.length) % slides.length;
                
                slides[currentSlide].classList.add('active');
                indicators[currentSlide].classList.add('active');
            }

            function nextSlide() {
                showSlide(currentSlide + 1);
            }

            function prevSlide() {
                showSlide(currentSlide - 1);
            }

            function startSlideShow() {
                slideInterval = setInterval(nextSlide, 5000);
            }

            function stopSlideShow() {
                clearInterval(slideInterval);
            }

            // Event Listeners
            nextBtn.addEventListener('click', () => {
                stopSlideShow();
                nextSlide();
                startSlideShow();
            });

            prevBtn.addEventListener('click', () => {
                stopSlideShow();
                prevSlide();
                startSlideShow();
            });

            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    stopSlideShow();
                    showSlide(index);
                    startSlideShow();
                });
            });

            // Pausar carrossel quando mouse estiver sobre ele
            const carousel = document.querySelector('.carousel-container');
            carousel.addEventListener('mouseenter', stopSlideShow);
            carousel.addEventListener('mouseleave', startSlideShow);

            // Iniciar carrossel
            startSlideShow();
        });

        // Botão Voltar ao Topo
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    // Mostrar/ocultar botão baseado no scroll
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    // Função para voltar ao topo suavemente
    function scrollToTop() {
        // Verifica se o usuário prefere reduzir movimento
        const prefersReducedMotion = document.body.classList.contains('reduce-motion');
        
        if (prefersReducedMotion) {
            // Scroll instantâneo para quem prefere reduzir animação
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
        } else {
            // Scroll suave para outros usuários
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Anuncia para leitores de tela
        announceToScreenReader('Voltou ao topo da página');
    }
    
    // Event Listeners
    window.addEventListener('scroll', toggleBackToTop);
    backToTopButton.addEventListener('click', scrollToTop);
    
    // Teclado - permitir ativação com Enter ou Espaço
    backToTopButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
    
    // Verificar estado inicial
    toggleBackToTop();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
});