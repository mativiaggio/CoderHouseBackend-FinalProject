const CartDAO = require("../dao/carts.dao");

class CartController {
  constructor() {
    this.cartDAO = new CartDAO();
  }

  // Crea un nuevo carrito
  async createCart(req, res) {
    try {
      const { products } = req.body;
      const newCart = await this.cartDAO.createCart(products);

      return { cart: newCart };
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  }

  // Obtiene un carrito por su ID
  async getCartById(paramcartId) {
    try {
      const cartId = paramcartId;
      const cart = await this.cartDAO.getCartById(cartId);
      return cart;
    } catch (error) {
      console.error("Error getting cart by ID:", error);
      throw error;
    }
  }

  // Añade un producto al carrito de un usuario
  async addProductToCart(userId, productId) {
    try {
      // Buscar el carrito del usuario
      const cart = await this.cartDAO.getCartByUserId(userId);

      if (!cart) {
        // Si el usuario no tiene un carrito, crear uno nuevo
        const newCart = await this.cartDAO.createCart([productId]);
        return newCart;
      }

      // Agregar el producto al carrito del usuario
      const result = await this.cartDAO.addProductToCart(cart._id, productId);

      if (result && result.error) {
        return { error: result.error };
      }

      return result;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Actualiza la cantidad de un producto en el carrito
  async updateProductQuantity(req, res) {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;
      const result = await this.cartDAO.updateProductQuantity(
        cartId,
        productId,
        quantity
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Error updating product quantity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Elimina un producto del carrito
  async removeProductFromCart(req, res) {
    try {
      const { cartId, productId } = req.params;
      const result = await this.cartDAO.removeProductFromCart(
        cartId,
        productId
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Obtiene un carrito por su ID
  async purchaseCart(paramcartId) {
    try {
      const cartId = paramcartId;

      const cart = await this.cartDAO.getCartById(cartId);

      if (!cart) {
        console.error("Cart not found");
        return { error: "Cart not found" };
      }

      const user = cart.user;

      const newTicket = new TicketModel({
        user: user,
        purchaser: user.email,
        cartId: cartId,
        products: cart.products,
        total_amount: cart.total,
      });

      await newTicket.save();

      await this.cartDAO.removeCart(cartId);

      return newTicket;
    } catch (error) {
      console.error("Error purchasing cart:", error.message);
      throw error;
    }
  }
}

module.exports = CartController;
