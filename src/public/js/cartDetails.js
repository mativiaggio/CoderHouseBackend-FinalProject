const cartId = document
  .getElementById("main-cart-container")
  .getAttribute("data-cart-id");

function increment(productId) {
  debugger;
  const quantityElement = document.getElementById("quantity_" + productId);
  let quantity = parseInt(quantityElement.innerText);
  quantity++;
  quantityElement.innerText = quantity;

  // Aquí puedes enviar una solicitud al servidor para actualizar la cantidad del producto en el carrito
  // Puedes usar fetch() o axios para enviar una solicitud al servidor
  // Ejemplo con fetch:
  fetch(`/${cartId}/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity: quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function decrement(productId) {
  const quantityElement = document.getElementById("quantity_" + productId);
  let quantity = parseInt(quantityElement.innerText);
  if (quantity > 1) {
    quantity--;
    quantityElement.innerText = quantity;
  } else {
    // Si la cantidad es 1, se elimina el producto del carrito
    removeProduct(productId);
  }

  // Aquí puedes enviar una solicitud al servidor para actualizar la cantidad del producto en el carrito
  // Puedes usar fetch() o axios para enviar una solicitud al servidor
  // Ejemplo con fetch:
  // fetch(`/cart/${cartId}/products/${productId}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({ quantity: quantity }),
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // });
}

function removeProduct(productId) {
  // Aquí puedes enviar una solicitud al servidor para eliminar el producto del carrito
  // Puedes usar fetch() o axios para enviar una solicitud al servidor
  // Ejemplo con fetch:
  // fetch(`/cart/${cartId}/products/${productId}`, {
  //     method: 'DELETE'
  // }).then(response => {
  //     // Si la solicitud se realizó con éxito, puedes eliminar la fila del producto del DOM
  //     const row = document.getElementById("row_" + productId);
  //     row.parentNode.removeChild(row);
  // });
}
