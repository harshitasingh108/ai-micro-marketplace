const express = require("express");
const router = express.Router();
const User = require("../models/User");


// ➜ Add favorite
router.post("/add", async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favourite: productId } },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ➜ Remove favorite
router.post("/remove", async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { favourite: productId } },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ➜ Get all favorites
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate("favourite");

        res.json(user.favourite);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;