const express = require("express");
const Product = require("../Database/models/product");
const { protect, vendor, admin } = require("../middleware/auth");

const router = express.Router();

//@route GET api/products
//@desc Get all products with filtering and pagination
//@access Public
router.get("/", async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, page = 1, limit = 12, sort = "-createdAt" } = req.query;

    // Build query
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Execute query with pagination
    const products = await Product.find(query)
      .populate("vendor", "name email")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalProducts: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//@route GET api/products/featured
//@desc Get featured products
//@access Public
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({ featured: true })
      .populate("vendor", "name email")
      .limit(8)
      .sort("-createdAt");

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//@route GET api/products/:id
//@desc Get single product by ID
//@access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendor", "name email")
      .populate("reviews.user", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//@route POST api/products
//@desc Create a new product
//@access Private (Vendor/Admin)
router.post("/", protect, vendor, async (req, res) => {
  try {
    const { name, description, price, category, brand, images, stock, discount } = req.body;

    // Validation
    if (!name || !description || !price || !category || !brand || !images || stock === undefined) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      images,
      stock,
      discount: discount || 0,
      vendor: req.user.id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//@route PUT api/products/:id
//@desc Update a product
//@access Private (Vendor/Admin)
router.put("/:id", protect, vendor, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user is the vendor or admin
    if (product.vendor.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//@route DELETE api/products/:id
//@desc Delete a product
//@access Private (Vendor/Admin)
router.delete("/:id", protect, vendor, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user is the vendor or admin
    if (product.vendor.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//@route POST api/products/:id/reviews
//@desc Create a product review
//@access Private
router.post("/:id/reviews", protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Please provide rating and comment" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user.id
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      user: req.user.id,
      name: req.user.name || "Anonymous",
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
