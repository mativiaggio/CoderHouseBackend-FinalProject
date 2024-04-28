var currentUrl = window.location.pathname;

var homeBtn = document.getElementById("home-li");
var productsBtn = document.getElementById("products-li");

if (currentUrl === "/") {
  homeBtn.classList.add("active");
} else if (currentUrl === "/products") {
  productsBtn.classList.add("active");
}
