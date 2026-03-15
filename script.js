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
        '.skill-card, .project-card, .edu-card, .highlight-item, .cert-card, .contact-item-link'
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

});
