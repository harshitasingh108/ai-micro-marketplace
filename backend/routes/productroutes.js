const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

router.post('/', async (req, res) => {
    try {
        const { title, price, description, image } = req.body;
        const product = await Product.create({
            title,
            price,
            description,
            image,
        }
        );
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// GET /products?search=phone&page=1&limit=5
router.get("/", async (req, res) => {
    try {
        const search = req.query.search || "";
        // URL se search text (optional)

        const page = parseInt(req.query.page) || 1;
        // page number, default 1

        const limit = parseInt(req.query.limit) || 5;
        // ek page me kitne products

        const skip = (page - 1) * limit;
        // page2 → first 5 skip

        const products = await Product.find({
            title: { $regex: search, $options: "i" }
            // title me search (case insensitive)
        })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        // latest first

        const total = await Product.countDocuments({
            title: { $regex: search, $options: "i" }
        });
        // total products count for pagination

        res.json({
            products,
            total,
            page,
            pages: Math.ceil(total / limit)
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = router;

