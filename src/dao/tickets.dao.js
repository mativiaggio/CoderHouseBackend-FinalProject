const Ticket = require("../models/tickets");
const ProductDAO = require("./products.dao"); // Importa el DAO de Productos para acceder a sus métodos

class TicketDAO {
  constructor() {
    this.productDAO = new ProductDAO();
  }

  async createTicket(cart, user) {
    try {
      const ticketProducts = cart.products.map((product) => ({
        productId: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      }));

      const generated_token = await this.generateToken();
      console.log("Creamos un token y el mismo es: " + generated_token);

      for (const product of ticketProducts) {
        console.log("product id " + product.productId);
        const quantity_to_change = product.quantity * -1;

        console.log("cantidad: " + quantity_to_change);
        await this.productDAO.updateProductStock(
          product.productId,
          quantity_to_change
        );
      }

      const ticketData = {
        user: cart.user,
        purchaser: user.email,
        cartId: cart._id,
        products: ticketProducts,
        purchase_datetime: new Date(),
        total_amount: cart.total,
        token: generated_token,
      };

      console.log("ticket data: " + ticketData);

      const ticket = new Ticket(ticketData);
      await ticket.save();

      return ticket;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  }

  async generateToken() {
    let length = 32;

    let a =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
        ""
      );
    let b = [];
    for (let i = 0; i < length; i++) {
      let j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join("");
  }
}

module.exports = TicketDAO;
