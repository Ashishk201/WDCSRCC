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

    // --- Event Modal Logic ---
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');
    const eventModal = document.getElementById('event-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeEventModal = document.querySelector('.close-event-modal');

    if (eventModal) {
        viewMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const title = button.getAttribute('data-title');
                const description = button.getAttribute('data-description');
                const image = button.getAttribute('data-image');

                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-image').src = image;
                document.getElementById('modal-description').textContent = description;

                eventModal.style.display = 'block';
                setTimeout(() => {
                    modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
                    modalContent.style.opacity = '1';
                }, 10);
            });
        });

        const closeModal = () => {
            modalContent.style.transform = 'translate(-50%, -50%) scale(0.9)';
            modalContent.style.opacity = '0';
            setTimeout(() => {
                eventModal.style.display = 'none';
            }, 300);
        };

        closeEventModal.addEventListener('click', closeModal);
        eventModal.addEventListener('click', (e) => {
            if (e.target === eventModal) {
                closeModal();
            }
        });
    }
});
