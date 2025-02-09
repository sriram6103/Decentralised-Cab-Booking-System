document.getElementById('signupForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const mobileNumber = document.getElementById('mobile_number').value;
  const password = document.getElementById('password').value;
  const verifyPassword = document.getElementById('verify-password').value;
  const role = document.getElementById('role').value;
  const license = document.getElementById('license') ? document.getElementById('license').value : null;
  const vehicleReg = document.getElementById('vehicle-reg') ? document.getElementById('vehicle-reg').value : null;

  // Validation
  if (!firstName || !lastName || !email || !mobileNumber || !password || !verifyPassword || !role) {
      alert("All fields are required.");
      return;
  }
  
  if (password !== verifyPassword) {
      alert("Passwords do not match.");
      return;
  }

  const data = {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      role,
      license,
      vehicleReg,
  };

  try {
      const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
          alert(result.message);
          window.location.href = './index.html'; // Redirect to login after successful signup
      } else {
          alert(result.error || 'An error occurred, please try again.');
      }
  } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred, please try again.');
  }
});
