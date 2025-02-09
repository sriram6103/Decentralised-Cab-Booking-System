document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        const email = document.getElementById("username").value; // Email
        const password = document.getElementById("password").value; // Password
        const role = document.getElementById("role").value; // Role ("user" or "driver")

        console.log(`Attempting to log in with: Email: ${email}, Password: ${password}, Role: ${role}`);

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }),
            });

            const data = await response.json();
            console.log("Response:", data);

            if (response.ok) {
                alert(data.message); // Show success message
                
                // Store user details in localStorage
                localStorage.setItem("userEmail", email);
                localStorage.setItem("userRole", role);
                
                if (role === "user") {
                    window.location.href = "../public/user_page.html";
                } else if (role === "driver") {
                    window.location.href = "../public/driver_page.html";
                }
            } else {
                alert(data.error); // Show error message
            }
        } catch (error) {
            console.error("Error during login attempt:", error);
            alert("An error occurred. Please try again.");
        }
    });
});
