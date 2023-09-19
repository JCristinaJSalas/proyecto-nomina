let formNomina = document.querySelector("form");

formNomina.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const {monto} =  data;
  console.log(monto)
} )