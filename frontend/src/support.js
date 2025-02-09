document.addEventListener('DOMContentLoaded', function () {
    // Handle FAQ toggle
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
      toggle.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      });
    });
  
    // Handle form submission
    const form = document.getElementById('support-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
  
      // Simulate an API request or form submission
      setTimeout(function () {
        document.getElementById('form-status').textContent = 'Your message has been submitted successfully. Our support team will get back to you soon.';
        form.reset();
      }, 1000);
    });
  });
  