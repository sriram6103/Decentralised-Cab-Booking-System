document.addEventListener("DOMContentLoaded", () => {
    const rideHistoryList = document.getElementById("ride-history");
  
    // Sample data for the rider's ride history (you can fetch this data from an API)
    const rideHistoryData = [
      { pickup: "Location A", dropoff: "Location B", date: "2025-01-20", status: "Completed" },
      { pickup: "Location C", dropoff: "Location D", date: "2025-01-18", status: "Completed" },
      { pickup: "Location E", dropoff: "Location F", date: "2025-01-15", status: "Completed" }
    ];
  
    // Function to render the ride history
    function renderRideHistory() {
      if (rideHistoryData.length === 0) {
        rideHistoryList.innerHTML = `<p>No rides completed yet.</p>`;
      } else {
        rideHistoryData.forEach(ride => {
          const rideItem = document.createElement("div");
          rideItem.classList.add("history-item");
  
          rideItem.innerHTML = `
            <p><strong>Pickup:</strong> ${ride.pickup}</p>
            <p><strong>Dropoff:</strong> ${ride.dropoff}</p>
            <p><strong>Date:</strong> ${ride.date}</p>
            <p><strong>Status:</strong> ${ride.status}</p>
          `;
  
          rideHistoryList.appendChild(rideItem);
        });
      }
    }
  
    // Call the function to render the history when the page loads
    renderRideHistory();
  });
  