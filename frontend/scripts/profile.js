// profile.js
document.addEventListener("DOMContentLoaded", () => {
    const profileButton = document.getElementById("profileButton");
    const profileWindow = document.getElementById("profileWindow");

    // Toggle profile window visibility on button click
    profileButton.addEventListener("click", () => {
        if (profileWindow.classList.contains("hidden")) {
            profileWindow.classList.remove("hidden");
            profileWindow.style.display = "block"; // Show the profile window
        } else {
            profileWindow.classList.add("hidden");
            profileWindow.style.display = "none"; // Hide the profile window
        }
    });

    // Hide the profile window if clicked outside
    document.addEventListener("click", (event) => {
        if (
            !profileButton.contains(event.target) &&
            !profileWindow.contains(event.target)
        ) {
            profileWindow.classList.add("hidden");
            profileWindow.style.display = "none";
        }
    });
});
