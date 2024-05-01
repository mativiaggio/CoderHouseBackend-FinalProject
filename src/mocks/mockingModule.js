const { customizeError } = require("./errorCustomizer");

const generateMockProducts = () => {
  const mockProducts = [];
  for (let i = 1; i <= 100; i++) {
    mockProducts.push({
      _id: `mockProductId${i}`,
      name: `Mock Product ${i}`,
      description: `Description for Mock Product ${i}`,
      price: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
      // Add more fields if needed
    });
  }
  return mockProducts;
};

const generateMockProductsWithErrors = (errorType) => {
  switch (errorType) {
    case "internal-server-error":
      throw new Error(customizeError("INTERNAL_SERVER_ERROR"));
    case "missing-title":
      return { error: customizeError("MISSING_TITLE") };
    case "missing-description":
      return { error: customizeError("MISSING_DESCRIPTION") };
    case "missing-category":
      return { error: customizeError("MISSING_CATEGORY") };
    case "missing-thumbnails":
      return { error: customizeError("MISSING_THUMBNAILS") };
    case "missing-code":
      return { error: customizeError("MISSING_CODE") };
    case "invalid-price":
      return { error: customizeError("INVALID_PRICE") };
    case "invalid-stock":
      return { error: customizeError("INVALID_STOCK") };
    case "stock-out-of-range":
      return { error: customizeError("STOCK_OUT_OF_RANGE") };
    case "thumbnails-not-array":
      return { error: customizeError("THUMBNAILS_NOT_ARRAY") };
    case "invalid-thumbnails":
      return { error: customizeError("INVALID_THUMBNAILS") };
    case "code-too-short":
      return { error: customizeError("CODE_TOO_SHORT") };
    case "code-too-long":
      return { error: customizeError("CODE_TOO_LONG") };
    case "invalid-category":
      return { error: customizeError("INVALID_CATEGORY") };
    case "invalid-status":
      return { error: customizeError("INVALID_STATUS") };
    case "invalid-description-length":
      return { error: customizeError("INVALID_DESCRIPTION_LENGTH") };
    case "invalid-title-length":
      return { error: customizeError("INVALID_TITLE_LENGTH") };
    case "missing-price":
      return { error: customizeError("MISSING_PRICE") };
    case "duplicate-code":
      return { error: customizeError("DUPLICATE_CODE") };
    default:
      throw new Error("Tipo de error no válido");
  }
};

module.exports = {
  generateMockProducts,
  generateMockProductsWithErrors,
};
