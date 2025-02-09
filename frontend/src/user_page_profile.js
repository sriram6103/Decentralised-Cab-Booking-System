document.addEventListener("DOMContentLoaded", async () => {
    const userEmail = localStorage.getItem("userEmail"); // Retrieve email from local storage after login
    const userRole = localStorage.getItem("userRole");   // Retrieve role from local storage

    if (!userEmail || !userRole) {
        alert("User not logged in!");
        window.location.href = "./index.html"; // Redirect to login page
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/profile?email=${userEmail}&role=${userRole}`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById("first-name").textContent = data.firstName;
            document.getElementById("last-name").textContent = data.lastName;
            document.getElementById("email").textContent = data.email;
            document.getElementById("mobile-number").textContent = data.mobileNumber;
        } else {
            alert(data.error || "Error fetching profile details");
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to fetch profile. Please try again later.");
    }
});
