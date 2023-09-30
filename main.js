import { calcular, saveData, writeData } from "./modulos/functionsApi.js";
import { busqueda } from "./modulos/busqueda.js";

const urlNomina = "http://127.0.54.1:5414/nomina";
const ingreTotal = document.querySelector(".ingreTotal");
const egreTotal = document.querySelector(".egreTotal");
const resTotal = document.querySelector(".resTotal");

document.addEventListener("DOMContentLoaded", async () => {
  saveData(urlNomina);
  writeData(urlNomina);
  busqueda(urlNomina);
  const { total, ingresos, egresos } = await calcular(urlNomina);
  resTotal.innerHTML = "$ " + total;
  egreTotal.innerHTML = "$ " + egresos;
  ingreTotal.innerHTML = "$ " + ingresos;
});

document.querySelectorAll(".text_input").forEach((element) => {
  element.addEventListener("blur", (event) => {
    if (!event.target.value) {
      event.target.nextElementSibling.classList.add("filled");
    } else {
      event.target.nextElementSibling.classList.remove("filled");
    }
  });
});
