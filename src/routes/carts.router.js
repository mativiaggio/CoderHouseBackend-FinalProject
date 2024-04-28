const { Router } = require("express");
const CartController = require("../controllers/carts.controller");

const router = Router();
const cartController = new CartController();

// Route to create a new cart
router.post("/", cartController.createCart.bind(cartController));

// Route to get a cart by its ID
router.get("/:cartId", cartController.getCartById.bind(cartController));

// Route to add a product to a cart
router.post(
  "/:cartId/products/:productId",
  cartController.addProductToCart.bind(cartController)
);

// Route to update the quantity of a product in a cart
router.put(
  "/:cartId/products/:productId",
  cartController.updateProductQuantity.bind(cartController)
);

// Route to remove a product from a cart
router.delete(
  "/:cartId/products/:productId",
  cartController.removeProductFromCart.bind(cartController)
);

module.exports = router;
