/* Profile Window */
.profile-window {
    position: absolute;
    top: 50px;
    right: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: none;
    z-index: 1000;
}

.profile-window.active {
    display: block;
}

.profile-window-content {
    list-style: none;
    padding: 10px;
    margin: 0;
}

.profile-window-content li {
    margin: 5px 0;
}

.profile-window-content .logout-button {
    color: red;
}
