document.addEventListener("DOMContentLoaded", () => {
    const notificationPopup = document.getElementById("notification-popup");
    const acceptButton = document.getElementById("accept-ride");
    const rejectButton = document.getElementById("reject-ride");
    const activeRideSection = document.getElementById("active-ride");
    const rideHistoryList = document.getElementById("ride-history");
    const statusToggle = document.getElementById("status-toggle");
    const riderStatus = document.getElementById("rider-status");
  
    // Function to simulate a new ride notification
    function simulateNewRide() {
      // Check if the rider is available
      if (riderStatus.textContent === "Available") {
        setTimeout(() => {
          notificationPopup.classList.remove("hidden");
          notificationPopup.classList.add("visible");
  
          // Hide the popup after 5 seconds
          setTimeout(() => {
            notificationPopup.classList.remove("visible");
            notificationPopup.classList.add("hidden");
          }, 5000); // Popup visible for 5 seconds
        }, 5000); // Trigger after 5 seconds of page load
      }
    }
  
    // Accept Ride
    acceptButton.addEventListener("click", () => {
      const pickup = document.getElementById("popup-pickup").textContent;
      const dropoff = document.getElementById("popup-dropoff").textContent;
  
      activeRideSection.innerHTML = `
        <h2>Active Ride</h2>
        <p>Pickup: ${pickup}</p>
        <p>Dropoff: ${dropoff}</p>
        <p>Status: Ongoing</p>
        <button id="complete-ride">Complete Ride</button>
      `;
      notificationPopup.classList.add("hidden");
  
      const completeButton = document.getElementById("complete-ride");
      completeButton.addEventListener("click", completeRide);
    });
  
    // Reject Ride
    rejectButton.addEventListener("click", () => {
      notificationPopup.classList.add("hidden");
      alert("You rejected the ride request.");
    });
  
    // Complete Ride
    function completeRide() {
      const rideDetails = activeRideSection.querySelectorAll("p");
      const pickup = rideDetails[0].textContent.split(": ")[1];
      const dropoff = rideDetails[1].textContent.split(": ")[1];
  
      const historyItem = document.createElement("li");
      historyItem.textContent = `Pickup: ${pickup}, Dropoff: ${dropoff}`;
      rideHistoryList.appendChild(historyItem);
  
      activeRideSection.innerHTML = `
        <h2>Active Ride</h2>
        <p>No active rides. Wait for new ride requests.</p>
      `;
    }
  
    // Toggle Rider Status
    statusToggle.addEventListener("change", () => {
      if (statusToggle.checked) {
        riderStatus.textContent = "Available";
        riderStatus.style.color = "green";
      } else {
        riderStatus.textContent = "Not Available";
        riderStatus.style.color = "red";
      }
    });
  
    // Initialize simulation
    simulateNewRide();
  });
  