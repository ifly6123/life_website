document.addEventListener('DOMContentLoaded', () => {

    // --- PRELOADER LOGIC ---
    const preloader = document.getElementById('preloader');
    const percentText = document.getElementById('preloader-percent');
    const mainContent = document.getElementById('main-content');
    let percent = 0;
    const interval = setInterval(() => {
        if (percent < 100) {
            percent++;
            percentText.textContent = percent;
        } else {
            clearInterval(interval);
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            mainContent.style.opacity = '1';
        }
    }, 30); // Adjust speed of preloader here

    // --- CUSTOM CURSOR LOGIC ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;
        
        cursorOutline.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // --- GSAP SCROLL ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);
    
    // --- Prologue Animation ---
    gsap.from(".prologue-text", {
        scrollTrigger: {
            trigger: "#prologue",
            start: "top 70%"
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out'
    });
    
    // --- Act I Animation with Blur Effect ---
    const actOneBg = document.querySelector("#act-one-ground .immersive-background");
    gsap.from("#act-one-ground .story-text", {
        scrollTrigger: {
            trigger: "#act-one-ground",
            start: "top 60%",
            onEnter: () => actOneBg.classList.add('background-is-blurred'),
            onLeaveBack: () => actOneBg.classList.remove('background-is-blurred'),
        },
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power3.out'
    });

    // --- Act II Animation with Blur Effect ---
    const actTwoBg = document.querySelector("#act-two-turbulence .immersive-background");
    gsap.from("#act-two-turbulence .story-text", {
        scrollTrigger: {
            trigger: "#act-two-turbulence",
            start: "top 60%",
            onEnter: () => actTwoBg.classList.add('background-is-blurred'),
            onLeaveBack: () => actTwoBg.classList.remove('background-is-blurred'),
        },
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power3.out'
    });

    // --- Act III: Immersive Cockpit Animation with Integrated Blur ---
    const cockpitTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".immersive-cockpit",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
        }
    });
    // Zoom into the cockpit photo
    cockpitTl.fromTo(".cockpit-background img", { scale: 1 }, { scale: 1.3, ease: 'power1.in' });
    // Fade in text overlays
    cockpitTl.from(".cockpit-overlay", { opacity: 0, duration: 1 }, 0.2);
    // Simultaneously animate the blur effect on the image
    cockpitTl.to(".cockpit-background img", { filter: 'blur(8px) brightness(0.7)', ease: 'power1.inOut' }, 0.2);

    // --- Act IV: Skills Nexus Cards Animation ---
    gsap.utils.toArray('.skill-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // --- Act V: Timeline Animation ---
    gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});