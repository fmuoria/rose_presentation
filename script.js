let currentSlide = 0;
const slides = document.querySelectorAll('.slide.full');
const totalSlides = slides.length;
document.getElementById('total-slides').textContent = totalSlides;

function showSlide(n) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === n);
    });
    document.getElementById('current-slide').textContent = n + 1;
    document.getElementById('prevBtn').disabled = n === 0;
    document.getElementById('nextBtn').disabled = n === totalSlides - 1;
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentSlide > 0) { currentSlide--; showSlide(currentSlide); }
});
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) { currentSlide++; showSlide(currentSlide); }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentSlide > 0) { currentSlide--; showSlide(currentSlide); }
    } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
        if (currentSlide < totalSlides - 1) { currentSlide++; showSlide(currentSlide); }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
});
