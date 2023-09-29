import { calcular, saveData,writeData } from "./modulos/functionsApi.js";
import { busqueda} from './modulos/busqueda.js'

const urlNomina = "http://127.0.54.1:5414/nomina";
const ingreTotal= document.querySelector(".ingreTotal")
const egreTotal= document.querySelector(".egreTotal")
const resTotal= document.querySelector(".resTotal")

document.addEventListener("DOMContentLoaded", async() => {
  saveData(urlNomina);
  writeData(urlNomina);
  busqueda(urlNomina);
  const {total,ingresos,egresos} = await calcular(urlNomina)
  resTotal.innerHTML = "$ "+ total;
  egreTotal.innerHTML = "$ "+ ingresos;
  ingreTotal.innerHTML = "$ "+ egresos;
});
const input = document.querySelector("input")
const label= document.querySelector(".label")
document.querySelectorAll('.text-input').forEach((element) => {

  element.addEventListener("blur",(event)=>{
    if(!event.target.value ("")){
      event.target.nextElementSibling.classList.add("filled");
  }  else{
    event.target.nextElementSibling.classList.remove('filled');
  
  }}
  );

  
});



input.addEventListener("input", () => {
  console.log(input.value);
  input.value !== "" ? (label.style.color = "transparent") : (label.style.color = ""); 
  //input.value !== "" ? (input.style.width = "350px") : (label.style.color = ""); 

})