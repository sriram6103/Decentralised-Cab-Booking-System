document.addEventListener("DOMContentLoaded", () => {
  const notificationsList = document.getElementById("notifications-list");
  const notificationBadge = document.getElementById("notification-badge");

  // Sample data for notifications (you can fetch this data from an API)
  const notificationsData = [
    { message: "New ride request from Location A to Location B.", time: "2025-01-20 12:30 PM", id: 1 },
    { message: "Your ride from Location C to Location D has been completed.", time: "2025-01-18 03:45 PM", id: 2 },
    { message: "New ride request from Location E to Location F.", time: "2025-01-15 10:00 AM", id: 3 }
  ];

  // Function to render notifications
  function renderNotifications() {
    if (notificationsData.length === 0) {
      notificationsList.innerHTML = `<p>No new notifications.</p>`;
      notificationBadge.style.visibility = "hidden";
    } else {
      let newNotificationsCount = 0;
      notificationsData.forEach(notification => {
        const notificationItem = document.createElement("div");
        notificationItem.classList.add("notification-item");

        notificationItem.innerHTML = `
          <p><strong>${notification.message}</strong></p>
          <div class="notification-time">${notification.time}</div>
          <div class="notification-action">
            <button id="notification-action-${notification.id}">Acknowledge</button>
          </div>
        `;

        notificationsList.appendChild(notificationItem);

        // Count new notifications (for example, notifications not acknowledged yet)
        newNotificationsCount++;

        // Add event listener to "Acknowledge" button
        const actionButton = document.getElementById(`notification-action-${notification.id}`);
        actionButton.addEventListener("click", () => acknowledgeNotification(notification.id));
      });

      // If there are new notifications, show the count in the navbar
      if (newNotificationsCount > 0) {
        notificationBadge.style.visibility = "visible";
        notificationBadge.textContent = newNotificationsCount;
      } else {
        notificationBadge.style.visibility = "hidden";
      }
    }
  }

  // Function to acknowledge the notification
  function acknowledgeNotification(notificationId) {
    const notificationItem = document.querySelector(`#notification-action-${notificationId}`).parentElement.parentElement;
    notificationItem.classList.add("acknowledged");
    notificationItem.querySelector(".notification-action").innerHTML = "<span>Acknowledged</span>";
    
    // Update the badge count
    const visibleCount = parseInt(notificationBadge.textContent) - 1;
    notificationBadge.textContent = visibleCount;

    if (visibleCount === 0) {
      notificationBadge.style.visibility = "hidden";
    }
  }

  // Call the function to render notifications when the page loads
  renderNotifications();
});
