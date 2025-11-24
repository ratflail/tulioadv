'use strict';

const cards = document.querySelectorAll('.areas__card');
const header = document.getElementById('header');
const about = document.getElementById('about');
const areas = document.getElementById('areas');
const footer = document.getElementById('footer');
const toggle = document.getElementById('menu__toggle');
const overlay = document.querySelector('.overlay');
const toggleClass = document.querySelector('.popup');

cards.forEach(card =>
  card.addEventListener('click', function (e) {
    e.preventDefault();
    card.classList.toggle('areas__card-flip');
  })
);

toggle.addEventListener('click', function (e) {
  e.preventDefault();

  toggleClass.classList.toggle('visible');
  overlay.classList.toggle('visible');
});

overlay.addEventListener('click', function () {
  toggleClass.classList.toggle('visible');
  overlay.classList.toggle('visible');
});

// Typewriter effect for hero text - FIXED VERSION
document.addEventListener('DOMContentLoaded', function () {
  const text = document.querySelector('.presents__text');

  if (text) {
    // Get the original HTML content
    const originalHTML = text.innerHTML;

    // CRITICAL FIX: Calculate and set width BEFORE clearing text
    const fullWidth = text.offsetWidth;
    text.style.minWidth = fullWidth + 'px';
    text.style.display = 'inline-block';

    // Clear the text
    text.innerHTML = '';
    text.style.opacity = '1'; // Make sure it's visible

    let charIndex = 0;
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    const textContent = tempDiv.textContent || tempDiv.innerText;

    function typeWriter() {
      if (charIndex < textContent.length) {
        // Build the HTML progressively
        let currentHTML = '';
        let textCharCount = 0;

        // Parse through original HTML and add characters
        for (let i = 0; i < originalHTML.length; i++) {
          if (originalHTML[i] === '<') {
            // Find the end of the tag
            let tagEnd = originalHTML.indexOf('>', i);
            currentHTML += originalHTML.substring(i, tagEnd + 1);
            i = tagEnd;
          } else {
            if (textCharCount < charIndex) {
              currentHTML += originalHTML[i];
              if (originalHTML[i] !== ' ' && originalHTML[i] !== '\n') {
                textCharCount++;
              }
            } else {
              break;
            }
          }
        }

        text.innerHTML = currentHTML + '<span class="cursor">|</span>';
        charIndex++;
        setTimeout(typeWriter, 50); // Adjust speed here (lower = faster)
      } else {
        // Remove cursor when done
        text.innerHTML = originalHTML;
      }
    }

    typeWriter();
  }
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    // Phone mask (Brazilian format)
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(
          2,
          7
        )}-${value.slice(7)}`;
      } else if (value.length > 6) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(
          2,
          6
        )}-${value.slice(6)}`;
      } else if (value.length > 2) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        e.target.value = `(${value}`;
      }
    });

    // Form submission
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value || 'Não especificado',
        message: document.getElementById('message').value,
      };

      // Get elements
      const feedback = document.getElementById('formFeedback');
      const submitBtn = contactForm.querySelector('.contact__btn');
      const originalBtnText = submitBtn.textContent;

      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'ENVIANDO...';

      // Hide any previous feedback
      feedback.className = 'contact__feedback';

      // Send to Formspree (you need to replace YOUR_FORM_ID)
      fetch('https://formspree.io/f/xjkjkkow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          if (response.ok) {
            // Success
            feedback.className = 'contact__feedback success';
            feedback.textContent =
              '✓ Mensagem enviada com sucesso! Retornaremos em breve.';
            contactForm.reset();

            // Scroll to feedback
            feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            throw new Error('Erro no envio');
          }
        })
        .catch(error => {
          // Error
          console.error('Form error:', error);
          feedback.className = 'contact__feedback error';
          feedback.textContent =
            '✗ Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato por WhatsApp.';
        })
        .finally(() => {
          // Re-enable button
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;

          // Hide feedback after 7 seconds
          setTimeout(() => {
            feedback.className = 'contact__feedback';
          }, 7000);
        });
    });
  }
});
