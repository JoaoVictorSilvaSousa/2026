/* =========================================
   1. LÓGICA DO CARROSSEL (EXISTENTE)
   ========================================= */
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);


let slideWidth = slides[0].getBoundingClientRect().width;


const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};


const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

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

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = "block";
        // Impede a rolagem do site atrás do modal
        document.body.style.overflow = "hidden";
    }
}

function fecharModalBotao(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}
function fecharModal(event, modalId) {
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
             entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));