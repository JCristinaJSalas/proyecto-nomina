import { saveData,writeData } from "./modulos/functionsApi.js";
import { busqueda} from './modulos/busqueda.js'

const urlNomina = "http://127.0.54.1:5414/nomina";

document.addEventListener("DOMContentLoaded", () => {
  saveData(urlNomina);
  writeData(urlNomina);
  busqueda(urlNomina);
  
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
});