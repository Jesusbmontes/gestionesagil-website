// ====== MENU TOGGLE (HAMBURGER) ======
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (!nav || !toggle) return;
    
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menu está abierto
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// ====== FAQ TOGGLE ======
function toggleFaq(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems || index < 0 || index >= faqItems.length) return;
    
    const currentItem = faqItems[index];
    const answer = currentItem.querySelector('.faq-answer');
    const chevron = currentItem.querySelector('.chevron');
    const questionBtn = currentItem.querySelector('.faq-question');

    // Cerrar todas las demás preguntas
    faqItems.forEach((item, i) => {
        if (i !== index) {
            const otherAnswer = item.querySelector('.faq-answer');
            const otherChevron = item.querySelector('.chevron');
            const otherQuestion = item.querySelector('.faq-question');
            
            if (otherAnswer) otherAnswer.classList.remove('open');
            if (otherChevron) otherChevron.classList.remove('rotate-180');
            if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
        }
    });

    // Toggle la pregunta actual
    const isOpen = answer.classList.toggle('open');
    if (chevron) chevron.classList.toggle('rotate-180');
    if (questionBtn) questionBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// ====== VEHICLE FIELDS TOGGLE (PÁGINA COTIZAR) ======
function updateVehicleFieldsPage() {
    const tipo = document.getElementById('tipoSeguro_page');
    const section = document.getElementById('vehicleSection_page');
    
    if (!tipo || !section) return;
    
    const fields = ['matricula_page', 'fechaCarnet_page', 'marcaVehiculo_page', 'modeloVehiculo_page', 'anoVehiculo_page'];
    
    if (tipo.value === 'auto' || tipo.value === 'moto') {
        section.style.display = 'block';
        fields.forEach(id => {
            const f = document.getElementById(id);
            if (f) f.required = true;
        });
    } else {
        section.style.display = 'none';
        fields.forEach(id => {
            const f = document.getElementById(id);
            if (f) f.required = false;
        });
    }
}

// ====== SUBMIT QUOTE FORM (PÁGINA COTIZAR) ======
function submitQuoteForm(e) {
    e.preventDefault();
    
    const get = id => {
        const element = document.getElementById(id);
        return element ? element.value : '';
    };
    
    let whatsappMsg = `✓ *NUEVA SOLICITUD DE COTIZACIÓN*\n\n`;
    whatsappMsg += `✓ *DATOS PERSONALES*\n`;
    whatsappMsg += `- Nombre: ${get('nombre_page')} ${get('apellidos_page')}\n`;
    whatsappMsg += `- DNI/NIE: ${get('dni_page')}\n`;
    whatsappMsg += `- Teléfono: ${get('telefono_page')}\n`;
    whatsappMsg += `- Email: ${get('email_page')}\n`;
    whatsappMsg += `- Fecha Nacimiento: ${get('fechaNacimiento_page')}\n`;
    whatsappMsg += `- Código Postal: ${get('codigoPostal_page')}\n\n`;
    
    whatsappMsg += `✓ *TIPO DE SEGURO*\n`;
    whatsappMsg += `- ${get('tipoSeguro_page').toUpperCase()}\n\n`;
    
    if (get('matricula_page') && (get('tipoSeguro_page') === 'auto' || get('tipoSeguro_page') === 'moto')) {
        whatsappMsg += `✓ *INFORMACIÓN DEL VEHÍCULO*\n`;
        whatsappMsg += `- Matrícula: ${get('matricula_page')}\n`;
        whatsappMsg += `- Marca: ${get('marcaVehiculo_page')}\n`;
        whatsappMsg += `- Modelo: ${get('modeloVehiculo_page')}\n`;
        whatsappMsg += `- Año: ${get('anoVehiculo_page')}\n`;
        whatsappMsg += `- Fecha de Carnet: ${get('fechaCarnet_page')}\n\n`;
    }
    
    if (get('mensaje_page')) {
        whatsappMsg += `✓ *INFORMACIÓN ADICIONAL*\n- ${get('mensaje_page')}\n\n`;
    }
    
    const whatsappUrl = `https://wa.me/34611342470?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(whatsappUrl, '_blank');
}

// ====== SUBMIT CONTACT FORM (PÁGINA CONTACTO) ======
function submitContactForm(e) {
    e.preventDefault();
    
    const get = id => document.getElementById(id) ? document.getElementById(id).value : '';
    
    let whatsappMsg = `✓ *NUEVO MENSAJE DE CONTACTO*\n\n`;
    whatsappMsg += `✓ *DATOS DEL REMITENTE*\n`;
    whatsappMsg += `- Nombre: ${get('nombre_contacto')} ${get('apellidos_contacto')}\n`;
    whatsappMsg += `- Teléfono: ${get('telefono_contacto')}\n`;
    whatsappMsg += `- Email: ${get('email_contacto')}\n\n`;
    whatsappMsg += `✓ *ASUNTO*\n`;
    whatsappMsg += `- ${get('asunto_contacto')}\n\n`;
    whatsappMsg += `✓ *MENSAJE*\n`;
    whatsappMsg += `${get('mensaje_contacto')}\n`;
    
    const whatsappUrl = `https://wa.me/34611342470?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(whatsappUrl, '_blank');
}

// ====== SMOOTH SCROLL ======
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Cerrar el menú móvil si está abierto
                const nav = document.getElementById('mainNav');
                const toggle = document.querySelector('.mobile-menu-toggle');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (toggle) toggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
}

// ====== INTERSECTION OBSERVER (ANIMACIONES) ======
function initIntersectionObserver() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.process-card, .benefit-card, .faq-item, .service-card, .testimonial-card')
        .forEach(el => observer.observe(el));
}

// ====== STICKY HEADER ======
function initStickyHeader() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    const onScroll = () => {
        if (window.scrollY > 24) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); 
}

// ====== FAQ KEYBOARD ACCESSIBILITY ======
function initFaqAccessibility() {
    document.querySelectorAll('.faq-item').forEach((item, idx) => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;
        
        btn.addEventListener('click', () => toggleFaq(idx));
        
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaq(idx);
            }
        });
    });
}

// ====== CERRAR MENÚ AL HACER CLICK FUERA ======
function initClickOutside() {
    document.addEventListener('click', (e) => {
        const nav = document.getElementById('mainNav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (!nav || !toggle) return;
        
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !toggle.contains(e.target)) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ====== CERRAR MENÚ CON ESC ======
function initEscapeKey() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const nav = document.getElementById('mainNav');
            const toggle = document.querySelector('.mobile-menu-toggle');
            
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (toggle) toggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// ====== INICIALIZACIÓN AL CARGAR EL DOM ======
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initIntersectionObserver();
    initStickyHeader();
    initFaqAccessibility();
    initClickOutside();
    initEscapeKey();
    
    document.querySelectorAll('.faq-item .faq-question').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
    });
    
    const tipoSeguroSelectPage = document.getElementById('tipoSeguro_page');
    if (tipoSeguroSelectPage) {
        tipoSeguroSelectPage.addEventListener('change', updateVehicleFieldsPage);
    }
    
    // Resize handler para menú móvil
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 880) {
                const nav = document.getElementById('mainNav');
                const toggle = document.querySelector('.mobile-menu-toggle');
                
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (toggle) toggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        }, 250);
    });
});