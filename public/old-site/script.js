document.addEventListener('DOMContentLoaded', () => {
    // ===== Contact Form Validation =====
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formMessage.style.color = 'red';
                formMessage.textContent = 'Please fill out all fields.';
                return;
            }

            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!email.match(emailPattern)) {
                formMessage.style.color = 'red';
                formMessage.textContent = 'Please enter a valid email address.';
                return;
            }

            formMessage.style.color = 'green';
            formMessage.textContent = 'Thank you! Your message has been sent.';
            form.reset();
        });
    }

    // ===== Blog "Read More" Toggle =====
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const moreText = button.previousElementSibling.querySelector('.more-text');
            if (moreText.style.display === 'none') {
                moreText.style.display = 'inline';
                button.textContent = 'Show Less';
            } else {
                moreText.style.display = 'none';
                button.textContent = 'Read More';
            }
        });
    });
});
