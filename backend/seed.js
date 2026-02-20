const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Products");
const User = require("./models/Users");
const bcrypt = require("bcryptjs");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("DB connected");

    await Product.deleteMany();
    await User.deleteMany();

    await Product.insertMany([
        { title: "Logo", price: 500, description: "Logo", image: "1.png" },
        { title: "UI", price: 1000, description: "UI", image: "2.png" },
        { title: "Banner", price: 200, description: "Banner", image: "3.png" },
        { title: "Poster", price: 300, description: "Poster", image: "4.png" },
        { title: "SEO", price: 800, description: "SEO", image: "5.png" },
        { title: "Video", price: 900, description: "Video", image: "6.png" },
        { title: "App UI", price: 2000, description: "App", image: "7.png" },
        { title: "Resume", price: 250, description: "Resume", image: "8.png" },
        { title: "Thumbnail", price: 150, description: "YT", image: "9.png" },
        { title: "Portfolio", price: 700, description: "Portfolio", image: "10.png" }
    ]);

    const hashed = await bcrypt.hash("123456", 10);

    await User.insertMany([
        {
            username: "harshita",
            email: "test1@mail.com",
            password: hashed
        },
        {
            username: "demo",
            email: "test2@mail.com",
            password: hashed
        }
    ]);

    console.log("Seed done");
    process.exit();
});