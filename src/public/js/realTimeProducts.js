const socket = io.connect("http://localhost:8080");

socket.on("disconnect", () => {
  console.log("Se perdió la conexión con el servidor");
});

document
  .getElementById("product-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newProduct = {};
    formData.forEach((value, key) => {
      newProduct[key] = value;
    });

    if (!newProduct.hasOwnProperty("status")) {
      newProduct.status = true;
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const responseData = await response.json();
        // socket.emit("newProduct", { newProduct });
        socket.emit("newProduct", newProduct);
        console.log(responseData.status);
      } else {
        const errorResponse = await response.json();
        console.error(errorResponse.error);
      }
    } catch (error) {
      console.error(error);
    }
  });

socket.on("updateProducts", ({ productData }) => {
  console.log("updateProducts");
  if (productData && typeof productData === "object") {
    const cardsContainer = document.getElementById("card-container");

    const existingProduct = Boolean(
      cardsContainer.querySelector(`#${productData.code}`)
    );
    if (!existingProduct) {
      const productHTML = `
      <div class="card col-3" style="width: 18rem; margin: 15px;">
        <div class="card-header">
          ${productData.title}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Descripción: ${productData.description}</li>
          <li class="list-group-item">Categoría: ${productData.category}</li>
          <li class="list-group-item">Precio: $${productData.price}</li>
          <li class="list-group-item">Stock: ${productData.stock}</li>
          <li class="list-group-item">Código: ${productData.code}</li>
        </ul>
      </div>
    `;
      cardsContainer.innerHTML += productHTML;
    } else {
      alert(`El producto ${productData.title} ya existe.`);
    }
  } else {
    console.error("productData no es un objeto válido:", productData);
  }
});
