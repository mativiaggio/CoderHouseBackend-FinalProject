const { Router } = require("express");

const router = Router();

const {
  generateMockProducts,
  generateMockProductsWithErrors,
} = require("../mocks/mockingModule");

const { customizeError } = require("../mocks/errorCustomizer");

router.get("/test/mockingproducts", (req, res) => {
  try {
    const mockProducts = generateMockProducts();
    res.json(mockProducts);
  } catch (error) {
    console.error("Error generating mock products:", error);
    res.status(500).json({ error: customizeError("INTERNAL_SERVER_ERROR") });
  }
});

router.get("/test/mocking-products-with-error/:error", (req, res) => {
  const error = req.params.error;
  try {
    const result = generateMockProductsWithErrors(error);
    res.status(500).json(result);
  } catch (error) {
    console.error("Error generating mock product with error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
