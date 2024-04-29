const cartId = document
  .getElementById("main-cart-container")
  .getAttribute("data-cart-id");

function increment(productId) {
  const quantityElement = document.getElementById("quantity_" + productId);
  let quantity = parseInt(quantityElement.innerText);
  quantity++;
  quantityElement.innerText = quantity;

  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity: quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      debugger;
      // Actualizar el total en la interfaz de usuario
      document.getElementById("cart-total").innerText = data.total;
    });
}

function decrement(productId) {
  const quantityElement = document.getElementById("quantity_" + productId);
  let quantity = parseInt(quantityElement.innerText);
  quantity--;
  quantityElement.innerText = quantity;

  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity: quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function removeProduct(productId) {
  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: "DELETE",
  }).then((response) => {
    const row = document.getElementById("row_" + productId);
    row.parentNode.removeChild(row);
  });
}
