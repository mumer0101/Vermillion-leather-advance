const express = require("express");
const app = express();
const port = 3000;

// Setup EJS and static folder
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// PRODUCT DATA
const PRODUCTS = [
  {
    id: 1,
    name: "Classic Black Jacket",
    material: "Cowhide",
    image: "img/products/1.webp",
    price: "$180",
    description: "A timeless staple crafted from premium black leather.",
    isAvailable: true
  },
  {
    id: 2,
    name: "Vintage Brown Zipper",
    material: "Cowhide",
    image: "img/products/3.webp",
    price: "$165",
    description: "Rich, premium brown leather jacket with a touch of rugged elegance.",
    isAvailable: true
  },
  {
    id: 3,
    name: "Classic Brown Jacket",
    material: "Cowhide",
    image: "img/products/2.webp",
    price: "$170",
    description: "A timeless staple brown leather jacket, versatile for any season.",
    isAvailable: false
  },
  {
    id: 4,
    name: "Sleek Black Wallet",
    material: "Buffalo Leather",
    image: "img/products/5.webp",
    price: "$40",
    description: "Premium black leather wallet for everyday elegance.",
    isAvailable: true
  },
  {
    id: 5,
    name: "Classic Brown Wallet",
    material: "Full-grain",
    image: "img/products/6.webp",
    price: "$45",
    description: "Timeless brown wallet blending function and style.",
    isAvailable: false
  },
  {
    id: 6,
    name: "Classic Black Belt",
    material: "Cowhide",
    image: "img/products/7.webp",
    price: "$ 35",
    description: "A versatile essential, this sleek black leather belt adds a touch of sophistication to any outfit.",
    isAvailable: true
  },
  {
    id: 7,
    name: "Timeless Brown Belt",
    material: "Full-grain",
    image: "img/products/8.webp",
    price: "$ 40",
    description: "A must-have accessory, this rich brown leather belt exudes classic charm and durability.",
    isAvailable: false
  },
  {
    id: 8,
    name: "Black Crocodile Belt",
    material: "Crocodile Leather",
    image: "img/products/9.webp",
    price: "$ 60",
    description: "Bold and luxurious, this black crocodile leather belt makes a strong statement of elegance and exclusivity.",
    isAvailable: true
  },
  {
    id: 9,
    name: "Travel Bag",
    material: "Cowhide",
    image: "img/products/10.webp",
    price: "$ 120",
    description: "Rugged yet refined, this brown leather travel bag is built for adventure and daily use.",
    isAvailable: true
  },
  {
    id: 10,
    name: "Black Office Bag",
    material: "Buffalo Leather",
    image: "img/products/11.webp",
    price: "$ 135",
    description: "Sleek and professional, this black leather office bag is designed for the modern gentleman.",
    isAvailable: false
  },
  {
    id: 11,
    name: "Brown Office Bag",
    material: "Cowhide",
    image: "img/products/12.webp",
    price: "$ 130",
    description: "Classic and sophisticated, this brown leather office bag blends elegance with functionality.",
    isAvailable: true
  },
  {
    id: 12,
    name: "Elegant Handbag",
    material: "Full-grain",
    image: "img/products/13.webp",
    price: "$ 85",
    description: "This brown leather handbag features intricate buckle details and a structured silhouette.",
    isAvailable: true
  },
  {
    id: 13,
    name: "Classic Women Wallet",
    material: "Cowhide",
    image: "img/products/14.webp",
    price: "$ 50",
    description: "Compact yet stylish, crafted with precision stitching and built for durability and elegance.",
    isAvailable: true
  },
  {
    id: 14,
    name: "Vintage Satchel",
    material: "Cowhide",
    image: "img/products/15.webp",
    price: "$ 95",
    description: "With a timeless design and premium leather, this satchel is perfect for any occasion.",
    isAvailable: false
  },
  {
    id: 15,
    name: "Custom Airpod Covers",
    material: "Buffalo Leather",
    image: "img/products/16.webp",
    price: "$ 30",
    description: "Protect your AirPods in style with this handcrafted leather cover designed for elegance and durability.",
    isAvailable: false
  },
  {
    id: 16,
    name: "Luxury Accessories Collection",
    material: "Cowhide",
    image: "img/products/17.jpg",
    price: "$ 60",
    description: "Includes mobile covers and glasses cases crafted from premium leather for daily use.",
    isAvailable: true
  },
  {
    id: 17,
    name: "Classic Watch Straps",
    material: "Full-grain",
    image: "img/products/18.webp",
    price: "$ 25",
    description: "Upgrade your timepiece with this premium strap crafted for comfort and timeless appeal.",
    isAvailable: true
  }
];

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define a route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Collection array (favorites)
const COLLECTION = [];

// HOME PAGE (Landing)
app.get("/", (req, res) => {
  res.render("home");
});

// PRODUCTS PAGE (View all + Add/Update)
app.get("/products", (req, res) => {
  res.render("products", { myList: PRODUCTS });
});

// CONTACT PAGE
app.get("/contact", (req, res) => {
  res.render("contact");
});

// ADD TO COLLECTION (favorites)
app.get("/add/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && index >= 0 && index < PRODUCTS.length) {
    COLLECTION.push(PRODUCTS[index]);
    return res.send(`<h2>Item added to your collection! <a href="/products">Back to Products</a></h2>`);
  } else {
    return res.send("Invalid product index.");
  }
});

// VIEW COLLECTION
app.get("/collection", (req, res) => {
  res.render("collection", { myList: COLLECTION });
});

// REMOVE FROM COLLECTION
app.get("/remove/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && index >= 0 && index < COLLECTION.length) {
    COLLECTION.splice(index, 1);
    return res.redirect("/collection");
  } else {
    return res.send("Invalid index.");
  }
});

// FILTER BY MATERIAL (used in Find Similar)
app.get("/find/:query", (req, res) => {
  const keyword = req.params.query.toLowerCase();
  const results = [];

  for (let i = 0; i < PRODUCTS.length; i++) {
    const material = PRODUCTS[i].material.toLowerCase();
    if (material === keyword) {
      results.push(PRODUCTS[i]);
    }
  }

  return res.render("products", { myList: results });
});

// ADD NEW PRODUCT
app.post("/add-item", (req, res) => {
  const { name, material, price, image, description } = req.body;
  const id = PRODUCTS.length + 1;

  const newItem = {
    id,
    name,
    material,
    price,
    image,
    description,
    isAvailable: true
  };

  PRODUCTS.push(newItem);
  res.redirect("/products");
});


// UPDATE isAvailable STATUS
app.post("/update-item/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const isAvailable = req.body.isAvailable === "on";

  for (let i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === id) {
      PRODUCTS[i].isAvailable = isAvailable;
      break;
    }
  }

  res.redirect("/products");
});

// FILTERED ITEMS PAGE
app.get("/filtered-items", (req, res) => {
  const filtered = [];
  for (let i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].isAvailable === true) {
      filtered.push(PRODUCTS[i]);
    }
  }

  res.render("products", { myList: filtered });
});

// START SERVER
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});