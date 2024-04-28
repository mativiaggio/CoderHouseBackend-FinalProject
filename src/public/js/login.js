const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);

  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });

  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        window.location.replace("/products");
      }
    })
    .catch((error) => console.error("Error:", error));
});
