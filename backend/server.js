const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/authrouter');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
mongoose.connect(process.env.MONGO_URI).then(() => { console.log("Connected to MongoDB") }).catch((err) => { console.log(err) });

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const productRoutes = require('./routes/productroutes');
app.use("/products", productRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
