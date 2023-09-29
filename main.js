import { saveData,writeData } from "./modulos/functionsApi.js";
import { busqueda} from './modulos/busqueda.js'

const urlNomina = "http://127.0.54.1:5414/nomina";

document.addEventListener("DOMContentLoaded", () => {
  saveData(urlNomina);
  writeData(urlNomina);
  busqueda(urlNomina);
  
});
