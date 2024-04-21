const cep = document.querySelector("#cep");

const showData = (result) => {
  for (const campo in result) {
    if (document.querySelector("#" + campo)) {
      document.querySelector("#" + campo).value = result[campo];
    }
  }
};

cep.addEventListener("blur", (e) => {
  let consult = cep.value.replace("-", "");
  const chose = {
    method: "GET",
    node: "cors",
    cache: "default",
  };

  fetch(`https://viacep.com.br/ws/${consult}/json/`, chose)
    .then((Response) => {
      Response.json().then((data) => showData(data));
    })
    .catch((e) => console.log("Erro! " + e));
});

//CSRF
function generateCSRFToken() {
  return Math.random().toString(36).substring(2);
}

document.getElementById("csrfToken").value = generateCSRFToken();

document
  .getElementById("csrfForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("http://localhost:3000/transfer", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRF-Token": document.getElementById("csrfToken").value,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Form submitted successfully!");
        } else {
          alert("Form submission failed!");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
