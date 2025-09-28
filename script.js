// Timeline data
const timelineData = [
    {
        year: "2016",
        title: "Founder's Research",
        description: "Restoration of Sisters in the Extreme",
        staff: "1 Staff"
    },
    {
        year: "2018",
        title: "Branding & Mathare Beginning",
        description: "Jan 24 incorporated as 501c3 Non-Profit",
        staff: "3 Staff"
    },
    {
        year: "2019",
        title: "Chalmers & V2 Curriculum",
        description: "Curriculum development and partnerships",
        staff: "4 Staff"
    },
    {
        year: "2020",
        title: "M.I. Accelerator & Faith Forward",
        description: "Cohort Model launch",
        staff: "5 Staff"
    },
    {
        year: "2021-2022",
        title: "Mighty Ally Accelerator",
        description: "Early growth and development",
        staff: "7 Staff"
    },
    {
        year: "2023",
        title: "GROWTH",
        description: "Local partners, tech, finance, funding development",
        staff: "36 Staff",
        special: "growth"
    },
    {
        year: "2024",
        title: "Strategy Adjustment & Alignment",
        description: "Organizational optimization",
        staff: "50+ Staff"
    },
    {
        year: "2025",
        title: "Founder Transition & Stabilization",
        description: "Leadership transition and sustainability",
        staff: "50+ Staff",
        special: "future"
    }
];

// Presentation logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.getElementById('total-slides').textContent = totalSlides;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (n >= totalSlides) currentSlide = 0;
    if (n < 0) currentSlide = totalSlides - 1;
    
    slides[currentSlide].classList.add('active');
    
    document.getElementById('current-slide').textContent = currentSlide + 1;
    
    document.getElementById('prevBtn').disabled = currentSlide === 0;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
    
    slides[currentSlide].classList.add('fade-in');
    setTimeout(() => {
        slides[currentSlide].classList.remove('fade-in');
    }, 800);
}

function changeSlide(n) {
    currentSlide += n;
    showSlide(currentSlide);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
        document.getElementById('fullscreenBtn').textContent = 'Exit Fullscreen';
    } else {
        document.exitFullscreen();
        document.getElementById('fullscreenBtn').textContent = 'Fullscreen';
    }
}

// Generate timeline items
function generateTimeline() {
    const container = document.getElementById('timeline-items');
    if (!container) return;
    
    container.innerHTML = timelineData.map((item, index) => {
        const isEven = index % 2 === 0;
        const cardClass = item.special === 'growth' ? 'milestone-card growth-card' : 
                         item.special === 'future' ? 'milestone-card future-card' : 'milestone-card';
        const dotClass = item.special === 'growth' ? 'timeline-dot growth-dot' : 
                        item.special === 'future' ? 'timeline-dot future-dot' : 'timeline-dot';
        const badgeClass = item.special === 'future' ? 'year-badge future-badge' : 'year-badge';
        
        return `
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="${badgeClass}">${item.year}</div>
                    <div class="${cardClass}">
                        <div class="milestone-title">${item.title}</div>
                        <div class="milestone-description">${item.description}</div>
                        <div class="staff-count">${item.staff}</div>
                    </div>
                </div>
                <div class="${dotClass}"></div>
            </div>
        `;
    }).join('');
}

// Event listeners
document.getElementById('prevBtn').addEventListener('click', () => changeSlide(-1));
document.getElementById('nextBtn').addEventListener('click', () => changeSlide(1));
document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentSlide > 0) changeSlide(-1);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        if (currentSlide < totalSlides - 1) changeSlide(1);
    } else if (e.key === 'Home') {
        currentSlide = 0;
        showSlide(currentSlide);
    } else if (e.key === 'End') {
        currentSlide = totalSlides - 1;
        showSlide(currentSlide);
    } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
    }
});

// Fullscreen change listener
document.addEventListener('fullscreenchange', function() {
    const btn = document.getElementById('fullscreenBtn');
    if (document.fullscreenElement) {
        btn.textContent = 'Exit Fullscreen';
    } else {
        btn.textContent = 'Fullscreen';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    generateTimeline();
    showSlide(currentSlide);
});

// CSS for special timeline items
const style = document.createElement('style');
style.textContent = `
    .growth-card {
        background: linear-gradient(135deg, #3aac76, #27a065) !important;
        color: white !important;
    }
    .growth-card .milestone-title,
    .growth-card .milestone-description {
        color: white !important;
    }
    .growth-card .staff-count {
        background: rgba(255,255,255,0.2) !important;
    }
    .growth-dot {
        background: #3aac76 !important;
        box-shadow: 0 0 0 4px #3aac76 !important;
    }
    .future-badge {
        background: #596a77 !important;
    }
    .future-dot {
        background: #596a77 !important;
        box-shadow: 0 0 0 4px #596a77 !important;
    }
`;
document.head.appendChild(style);
