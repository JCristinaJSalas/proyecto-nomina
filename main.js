import { writeData } from "./modulos/read.js";
import { saveData } from "./modulos/saveData.js";
import { busqueda} from './modulos/busqueda.js'

const urlNomina = "https://6509ed8cf6553137159c442b.mockapi.io/nomina";

document.addEventListener("DOMContentLoaded", () => {
  saveData(urlNomina);
  writeData(urlNomina);
  busqueda(urlNomina);
  
});
