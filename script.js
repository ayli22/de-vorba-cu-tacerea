

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('open');

        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.textContent = isOpen ? '×' : '☰';
    });

    navigation.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navigation.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.textContent = '☰';
        });
    });
}




const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});




const lightbox = document.getElementById('poemLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

if (lightbox && lightboxImage && lightboxClose) {

    document.querySelectorAll('.fragment-card img').forEach(image => {
        image.addEventListener('click', () => {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });


    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });


    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}




const reviewForm = document.querySelector('.review-form');

if (reviewForm) {

    reviewForm.addEventListener('submit', async function(event) {

        event.preventDefault();

        const submitButton = reviewForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.textContent = 'Se trimite...';

        try {

            const response = await fetch(reviewForm.action, {
                method: 'POST',
                body: new FormData(reviewForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {

                window.location.href = 'multumesc.html';

            } else {

                throw new Error('Trimiterea nu a reușit.');

            }

        } catch (error) {

            alert('Impresia nu a putut fi trimisă. Te rugăm să încerci din nou.');

            submitButton.disabled = false;
            submitButton.innerHTML = originalText;

        }

    });

}
