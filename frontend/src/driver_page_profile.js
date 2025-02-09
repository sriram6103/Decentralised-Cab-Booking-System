document.addEventListener("DOMContentLoaded", async () => {
    const driverEmail = localStorage.getItem("userEmail"); // Retrieve email from local storage
    const driverRole = localStorage.getItem("userRole");   // Retrieve role from local storage

    if (!driverEmail || !driverRole || driverRole !== "driver") {
        alert("Driver not logged in!");
        window.location.href = "./index.html"; // Redirect to login page
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/profile?email=${driverEmail}&role=driver`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById("first-name").textContent = data.firstName;
            document.getElementById("last-name").textContent = data.lastName;
            document.getElementById("email").textContent = data.email;
            document.getElementById("mobile-number").textContent = data.mobileNumber;
            document.getElementById("license").textContent = data.license;
            document.getElementById("vehicle-reg").textContent = data.vehicleReg;
        } else {
            alert(data.error || "Error fetching profile details");
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to fetch profile. Please try again later.");
    }
});
