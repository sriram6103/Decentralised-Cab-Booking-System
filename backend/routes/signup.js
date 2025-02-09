const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Driver = require("../models/driver");

router.post("/signup", async (req, res) => {
    const { firstname, lastname, email, mobile_number, password, role, license, vehicle_registration } = req.body;

    try {
        if (role === "user") {
            const user = new User({ firstname, lastname, email, mobile_number, password, role });
            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        } else if (role === "driver") {
            const driver = new Driver({ firstname, lastname, email, mobile_number, password, role, license, vehicle_registration });
            await driver.save();
            res.status(201).json({ message: "Driver registered successfully" });
        } else {
            res.status(400).json({ error: "Invalid role" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
