import { writeData } from "./functionsApi.js";

const inputBusqueda = document.querySelector("#busqueda");
const resultadoTabla = document.querySelector("#body-tabla");
const iconoBusqueda = document.querySelector('box-icon[name="search"]');

// Funcion para realizar la busqueda
export const busqueda = async (urlNomina) => {
  // evento co teclado
  inputBusqueda.addEventListener("keyup", (event) => event.key === "Enter" ? realizarBusqueda(urlNomina): "");
  // evento con la lupa
  inputBusqueda.addEventListener("input", () => realizarBusqueda(urlNomina));
};

// Funcion  busqueda
const tabla = document.querySelector("#body-tabla");
const realizarBusqueda = async (urlNomina) => {
  // convertir la value a minuscula
  const terminoBusqueda = inputBusqueda.value.trim().toLowerCase();
  const data = await (await fetch(urlNomina)).json();
  // Filtro de data convirtiendolo a minuscula
  const resultadosFiltrados = data.filter((item) =>
    item.descripcion.toLowerCase().includes(terminoBusqueda)
  );

  terminoBusqueda === "" ? writeData(urlNomina): mostrarResultados(resultadosFiltrados);
};



// mostrar los resultados en la tabla

const mostrarResultados = (resultadosFiltrados) => {

  
  resultadosFiltrados.map((info) =>{
    console.log(info.descripcion)
    tabla.innerHTML =" "
    tabla.insertAdjacentHTML(
    "beforeend",
    `
        <tr class="cuerpo">
          <td>${info.id}</td>
          <td>$ ${parseFloat(info.monto).toLocaleString("es-ES")}</td>
          <td>${info.eleccion}</td>
          <td>${info.descripcion}</td>
          <td>
          <button class="editBoton" id="${info.id}">
            <box-icon name='edit-alt' color='#ffb17ae5'></box-icon>
          </button>
        </td>
        <td>
          <button class="delete" id='${info.id}'>
            <box-icon name='trash' color='#EC5766'></box-icon>
          </button>
        </td>
        </tr>
      `
  )
  })
  
}
