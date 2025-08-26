document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 85) {
            // Downscroll
            header.style.top = "-85px";
        } else {
            // Upscroll
            header.style.top = "0";
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // --- Popup Menu Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('close-btn');
    const popupMenu = document.getElementById('popup-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            popupMenu.classList.add('show');
        });
    }
    
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            popupMenu.classList.remove('show');
        });
    }

    // --- Hero Slideshow Logic ---
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroSlides = document.querySelectorAll('.hero-bg-slide');
        const heroPrevBtn = document.getElementById('heroPrevBtn');
        const heroNextBtn = document.getElementById('heroNextBtn');
        let currentHeroSlide = 0;
        let heroSlideInterval;

        function showHeroSlide(index) {
            heroSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextHeroSlide() {
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            showHeroSlide(currentHeroSlide);
        }

        function prevHeroSlide() {
            currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
            showHeroSlide(currentHeroSlide);
        }

        function startHeroSlideShow() {
            heroSlideInterval = setInterval(nextHeroSlide, 7000); // Change slide every 7 seconds
        }

        heroNextBtn.addEventListener('click', () => {
            nextHeroSlide();
            clearInterval(heroSlideInterval);
            startHeroSlideShow();
        });

        heroPrevBtn.addEventListener('click', () => {
            prevHeroSlide();
            clearInterval(heroSlideInterval);
            startHeroSlideShow();
        });

        showHeroSlide(currentHeroSlide);
        startHeroSlideShow();
    }

    // --- Testimonial Slider Logic ---
    const slider = document.querySelector('.slider-container');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'exiting');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            const exitingSlide = currentSlide;
            slides[exitingSlide].classList.add('exiting');
            
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
             slides[currentSlide].style.transition = 'none';
             slides[currentSlide].classList.remove('active');
            
             currentSlide = (currentSlide - 1 + slides.length) % slides.length;
             
             slides[currentSlide].style.transform = 'translateX(-100%)';
             slides[currentSlide].style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';

             setTimeout(() => {
                showSlide(currentSlide);
             }, 20);
        }

        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlideShow() {
            clearInterval(slideInterval);
        }
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });
        
        showSlide(currentSlide);
        startSlideShow();
    }


    // --- Scroll Animation Logic ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });

    // --- Stats Counter Animation ---
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; // 2 seconds
                        const stepTime = 20;
                        const steps = duration / stepTime;
                        const increment = target / steps;
                        let current = 0;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                clearInterval(timer);
                                counter.innerText = target + '+';
                            } else {
                                counter.innerText = Math.ceil(current) + '+';
                            }
                        }, stepTime);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // --- Event & Team Modal Logic ---
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModalBtn = document.querySelector('.close-modal');

    if (modal) {
        const openModal = (title, image, description) => {
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-image').src = image;
            document.getElementById('modal-description').innerHTML = description;

            modal.style.display = 'block';
            setTimeout(() => {
                modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
                modalContent.style.opacity = '1';
            }, 10);
        };

        const closeModal = () => {
            modalContent.style.transform = 'translate(-50%, -50%) scale(0.9)';
            modalContent.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        };

        viewMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const title = button.getAttribute('data-title');
                const description = button.getAttribute('data-description');
                const image = button.getAttribute('data-image');
                openModal(title, image, description);
            });
        });
        
        const teamMembers = document.querySelectorAll('.team-member img');
        teamMembers.forEach(member => {
            member.addEventListener('click', () => {
                const name = member.nextElementSibling.textContent;
                const role = member.nextElementSibling.nextElementSibling.textContent;
                const image = member.src;
                const description = `
                    <p><strong>Role:</strong> ${role}</p>
                    <p>A dedicated and passionate member of our team, contributing significantly to our mission. [Add more detailed bio here].</p>
                `;
                openModal(name, image, description);
            });
        });

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

});
