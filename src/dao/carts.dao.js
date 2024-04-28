const Cart = require("../models/carts");

class CartDAO {
  // Crea un carrito con los productos proporcionados
  async createCart(products) {
    try {
      const productsWithQuantity = products.map((productId) => ({
        id: productId,
        quantity: 1,
      }));

      const cart = new Cart({
        products: productsWithQuantity,
      });

      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error creating cart:", error.message);
      throw error;
    }
  }

  // Obtiene un carrito por su ID
  async getCartById(cartId) {
    try {
      const cart = await Cart.findById(cartId).lean();
      return cart;
    } catch (error) {
      console.error("Error getting cart by ID:", error.message);
      throw error;
    }
  }

  // Obtiene un carrito por el ID de usuario
  async getCartByUserId(userId) {
    try {
      const cart = await Cart.findOne({ user: userId });
      return cart;
    } catch (error) {
      console.error("Error getting cart by user ID:", error.message);
      throw error;
    }
  }

  // Añade un producto al carrito
  async addProductToCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);

      if (!cart) {
        console.error("Cart not found");
        return { error: "Cart not found" };
      }

      const existingProduct = cart.products.find(
        (product) => product.id === productId
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ id: productId, quantity: 1 });
      }

      await cart.save();
      return existingProduct || { id: productId, quantity: 1 };
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      throw error;
    }
  }

  // Actualiza la cantidad de un producto en el carrito
  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);

      if (!cart) {
        console.error("Cart not found");
        return { error: "Cart not found" };
      }

      const existingProduct = cart.products.find(
        (product) => product.id.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity = quantity;
        await cart.save();
        return existingProduct;
      } else {
        console.error("Product not found in the cart");
        return { error: "Product not found in the cart" };
      }
    } catch (error) {
      console.error("Error updating product quantity:", error.message);
      throw error;
    }
  }

  // Elimina un producto del carrito
  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);

      if (!cart) {
        console.error("Cart not found");
        return { error: "Cart not found" };
      }

      const indexToRemove = cart.products.findIndex(
        (product) => product.id.toString() === productId
      );

      if (indexToRemove !== -1) {
        cart.products.splice(indexToRemove, 1);
        await cart.save();
        return { message: "Product removed from cart" };
      } else {
        console.error("Product not found in the cart");
        return { error: "Product not found in the cart" };
      }
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
      throw error;
    }
  }
}

module.exports = CartDAO;
