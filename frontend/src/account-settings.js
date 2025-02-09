document.addEventListener("DOMContentLoaded", () => {
    // Handling form submissions
    const personalInfoForm = document.getElementById("personal-info-form");
    const securityForm = document.getElementById("security-form");
    const preferencesForm = document.getElementById("preferences-form");
    
    personalInfoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Handle personal info updates
      alert("Personal information updated!");
    });
    
    securityForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
  
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
      } else {
        alert("Password changed successfully!");
      }
    });
  
    preferencesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Handle preference updates
      alert("Preferences saved!");
    });
  
    // Handling payment methods removal
    const removePaymentBtns = document.querySelectorAll(".remove-payment-btn");
    removePaymentBtns.forEach(button => {
      button.addEventListener("click", (event) => {
        const paymentMethodItem = event.target.closest("li");
        paymentMethodItem.remove();
        alert("Payment method removed!");
      });
    });
  
    // Handling Add Payment Method button
    const addPaymentBtn = document.getElementById("add-payment-btn");
    addPaymentBtn.addEventListener("click", () => {
      alert("Add payment method functionality coming soon!");
    });
  });
  