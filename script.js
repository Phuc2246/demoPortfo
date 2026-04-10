document.addEventListener('DOMContentLoaded', () => {

    // ===== SCROLL PROGRESS =====
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('backTop');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.width = (scrolled / total * 100) + '%';

        navbar.classList.toggle('scrolled', scrolled > 60);
        backTop.classList.toggle('show', scrolled > 400);
    });

    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== HAMBURGER =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinkEls.forEach(el => el.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const active = document.querySelector(`.nav-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => sectionObserver.observe(s));

    // ===== TYPING EFFECT =====
    const roles = [
        'Fresher Embedded Engineer',
        'STM32 Bare-metal Developer',
        'Embedded Linux Enthusiast',
        'Automotive Systems Learner',
    ];
    let roleIdx = 0, charIdx = 0, deleting = false;
    const roleText = document.getElementById('roleText');

    function type() {
        const current = roles[roleIdx];
        if (!deleting) {
            roleText.textContent = current.slice(0, ++charIdx);
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(type, 2000);
                return;
            }
        } else {
            roleText.textContent = current.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
            }
        }
        setTimeout(type, deleting ? 40 : 70);
    }
    type();

    // ===== SCROLL REVEAL =====
    const reveals = document.querySelectorAll(
        '.skill-card, .project-card, .edu-card, .timeline-item, .highlight-item, .cert-card, .contact-item-link, .stat-item'
    );

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-thumb').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.dataset.full || img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ===== CONTACT FORM =====
    const form = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const span = btn.querySelector('span');
            const icon = btn.querySelector('i');

            btn.disabled = true;
            icon.className = 'fas fa-spinner fa-spin';
            span.textContent = 'Sending...';

            setTimeout(() => {
                form.reset();
                icon.className = 'fas fa-check';
                span.textContent = 'Message Sent!';
                formNote.textContent = "Thanks for reaching out! I'll get back to you soon.";
                formNote.style.color = '#3fb950';

                setTimeout(() => {
                    btn.disabled = false;
                    icon.className = 'fas fa-paper-plane';
                    span.textContent = 'Send Message';
                    formNote.textContent = '';
                }, 4000);
            }, 1200);
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== PARTICLE CANVAS =====
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.r = Math.random() * 1.5 + 0.5;
                this.alpha = Math.random() * 0.5 + 0.15;
                this.color = Math.random() > 0.7 ? '163,113,247' : '0,212,255';
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 90; i++) particles.push(new Particle());

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0,212,255,${0.12 * (1 - dist / 130)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawLines();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ===== 3D TILT + GLARE =====
    const tiltEls = document.querySelectorAll('.skill-card, .cert-card, .timeline-content, .stat-item');

    tiltEls.forEach(card => {
        const shine = document.createElement('div');
        shine.className = 'tilt-shine';
        card.appendChild(shine);

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'box-shadow 0.3s, border-color 0.3s';
        });

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -12;
            const rotY = ((x - cx) / cx) * 12;

            card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`;

            const sx = (x / rect.width) * 100;
            const sy = (y / rect.height) * 100;
            shine.style.background = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.1) 0%, transparent 65%)`;
            shine.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s, border-color 0.3s';
            card.style.transform = '';
            shine.style.opacity = '0';
        });
    });

    // ===== COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            let current = 0;
            const step = target / 60;
            const tick = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(tick);
                }
                el.textContent = Math.floor(current) + suffix;
            }, 25);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.6 });
    statNumbers.forEach(el => counterObserver.observe(el));

});
