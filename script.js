/* =========================================
   1. LÓGICA DO CARROSSEL (EXISTENTE)
   ========================================= */
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

// Pega a largura do primeiro slide
let slideWidth = slides[0].getBoundingClientRect().width;

// Função para posicionar os slides um ao lado do outro
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
// Aplica a posição inicial
slides.forEach(setSlidePosition);

// Função para mover o trilho para o slide alvo
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

// Função para atualizar as bolinhas
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

// --- Evento de Redimensionamento da Janela ---
window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach(setSlidePosition);
    
    const currentSlide = track.querySelector('.current-slide');
    track.style.transition = 'none'; 
    track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
    setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out'; 
    }, 100);
});

// --- Botões e Bolinhas ---
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    let nextDot = currentDot.nextElementSibling;

    if (!nextSlide) { nextSlide = slides[0]; nextDot = dots[0]; } // Loop
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
});

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    let prevDot = currentDot.previousElementSibling;

    if (!prevSlide) { prevSlide = slides[slides.length - 1]; prevDot = dots[dots.length - 1]; } // Loop
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
});

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});


/* =========================================
   2. LÓGICA DOS MODAIS (PROJETOS)
   ========================================= */

// Função para abrir o modal específico
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = "block";
        // Impede a rolagem do site atrás do modal
        document.body.style.overflow = "hidden";
    }
}

// Função para fechar clicando no botão X
function fecharModalBotao(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = "none";
        // Libera a rolagem do site
        document.body.style.overflow = "auto";
    }
}

// Função para fechar clicando no fundo escuro (Overlay)
function fecharModal(event, modalId) {
    // Verifica se o clique foi EXATAMENTE no fundo escuro e não na caixa branca
    if (event.target.id === modalId) {
        document.getElementById(modalId).style.display = "none";
        document.body.style.overflow = "auto";
    }
}
/* =========================================
   3. ANIMAÇÃO AO ROLAR (SCROLL REVEAL)
   ========================================= */

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // Se quiser que a animação repita ao subir e descer,
            // descomente a linha abaixo:
            // entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));