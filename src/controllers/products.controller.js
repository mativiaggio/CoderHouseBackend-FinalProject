const ProductDAO = require("../dao/products.dao");

const productDAO = new ProductDAO();

class ProductController {
  // Obtiene una lista paginada de productos con opciones de filtro y ordenamiento
  async getProducts(req, res) {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
      const skip = (page - 1) * limit;

      const filter = {};
      if (query) {
        filter["$or"] = [
          { category: { $regex: query, $options: "i" } },
          { status: { $regex: query, $options: "i" } },
        ];
      }

      const sortOptions = {};
      if (sort) {
        sortOptions.price = sort === "asc" ? 1 : -1;
      }

      const products = await productDAO.getProducts(
        limit,
        page,
        sortOptions,
        filter
      );

      const totalProducts = await productDAO.countProducts(filter);
      const totalPages = Math.ceil(totalProducts / limit);

      const result = {
        status: "success",
        payload: products,
        totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        page: parseInt(page),
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevLink:
          page > 1 ? `/api/products?limit=${limit}&page=${page - 1}` : null,
        nextLink:
          page < totalPages
            ? `/api/products?limit=${limit}&page=${page + 1}`
            : null,
      };

      return result;
    } catch (error) {
      console.error("Error in /products route:", error);
      throw error;
    }
  }

  // Obtiene un producto por su ID
  async getProductById(paramproductId) {
    try {
      const productId = paramproductId;
      const product = await productDAO.getProductById(productId);
      return product;
    } catch (error) {
      console.error("Error getting product by ID:", error);
      throw error;
    }
  }

  // Agrega un nuevo producto
  async addProduct(req, res) {
    try {
      const productData = req.body;
      const result = await productDAO.addProduct(productData);
      return result;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }

  // Actualiza un producto existente
  async updateProduct(req, res) {
    try {
      const productId = req.params.pid;
      const updatedProductData = req.body;
      const result = await productDAO.updateProduct(
        productId,
        updatedProductData
      );
      return result;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  // Elimina un producto existente
  async deleteProduct(req, res) {
    try {
      const productId = req.params.pid;
      const result = await productDAO.deleteProduct(productId);
      return result;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

module.exports = ProductController;
