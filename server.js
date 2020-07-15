const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const shortid = require("shortid")

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/react-shop-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// Product Model
const Product = mongoose.model("products", new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSize: [String]
}))

// Order Model
const Order = mongoose.model("order", new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    name: String,
    email: String,
    address: String,
    total: Number,
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        count: Number
    }],
}, {
    timestamps: true
}))


// Products Routes

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})


// Order Routes

app.post("/api/orders", async (req, res) => {
    if (!req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        res.send({
            message: "Data required"
        })
    }
    const order = await Order(req.body).save();
    res.send(order)
})

app.get("/api/orders", async (req, res) => {
    const order = await Order.find({})
    res.send(order)
})

app.delete("/api/orders/:id", async (req, res) => {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id)
    res.send(deletedOrder)
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))