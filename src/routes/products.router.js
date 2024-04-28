const { Router } = require("express");
const ProductController = require("../controllers/products.controller");

const router = Router();
const productController = new ProductController();

// Route to get all products
router.get("/", async (req, res) => {
  try {
    await productController.getProducts(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get a product by ID
router.get("/:pid", async (req, res) => {
  try {
    await productController.getProductById(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to add a new product
router.post("/", async (req, res) => {
  try {
    await productController.addProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to update a product by ID
router.put("/:pid", async (req, res) => {
  try {
    await productController.updateProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete a product by ID
router.delete("/:pid", async (req, res) => {
  try {
    await productController.deleteProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
