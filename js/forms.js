// Form handling

export function initFormHandling() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formValues = {};
    const inputs = contactForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      if (input.name) {
        formValues[input.name] = input.value;
      }
    });

    const requiredFields = contactForm.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = "#ef4444";

        setTimeout(() => {
          field.style.borderColor = "#3f3f46";
        }, 3000);
      }
    });

    if (isValid) {
      const submitBtn = contactForm.querySelector(".form-submit");
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("Thank you for your message! I'll get back to you soon.");
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    } else {
      alert("Please fill in all required fields.");
    }
  });
}
