// 1. Barra de progreso de lectura
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector(".scroll-progress").style.width = scrolled + "%";

    // Efecto sombra Navbar
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// 2. Revelado suave de secciones (Intersection Observer)
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('reveal-on-scroll');
    observer.observe(section);
});

// 3. Suavizado de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 4. Función para copiar email al portapapeles
const emailBtn = document.getElementById('copyEmailBtn');
const tooltip = document.getElementById('copyTooltip');

if (emailBtn) {
    emailBtn.addEventListener('click', () => {
        const email = emailBtn.getAttribute('data-email');
        
        navigator.clipboard.writeText(email).then(() => {
            tooltip.classList.add('show');
            
            const originalText = document.getElementById('emailText').innerText;
            document.getElementById('emailText').innerText = "Copiado";

            setTimeout(() => {
                tooltip.classList.remove('show');
                document.getElementById('emailText').innerText = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar: ', err);
            window.location.href = `mailto:${email}`;
        });
    });
}