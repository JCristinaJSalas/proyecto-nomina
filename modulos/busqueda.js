import { writeData } from "./functionsApi.js";

const inputBusqueda = document.querySelector("#busqueda");
const tabla = document.querySelector("#body-tabla");

// Función para realizar la búsqueda
export const busqueda = async (urlNomina) => {
  inputBusqueda.addEventListener("input", () => realizarBusqueda(urlNomina));
  inputBusqueda.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      realizarBusqueda(urlNomina);
    }
  });

  realizarBusqueda(urlNomina); // Realiza la búsqueda inicial al cargar la página
};

// Función de búsqueda
const realizarBusqueda = async (urlNomina) => {
  const terminoBusqueda = inputBusqueda.value.trim().toLowerCase();

  try {
    const response = await fetch(urlNomina);
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const data = await response.json();

    const resultadosFiltrados = data.filter((item) =>
      item.descripcion.toLowerCase().includes(terminoBusqueda)
    );

    if (terminoBusqueda === "") {
      writeData(urlNomina);
    } else {
      mostrarResultados(resultadosFiltrados);
    }
  } catch (error) {
    console.error("Error al buscar:", error);
  }
};

// Mostrar los resultados en la tabla
const mostrarResultados = (resultadosFiltrados) => {
  tabla.innerHTML = "";

  resultadosFiltrados.forEach((info) => {
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
            <i class='bx bx-edit-alt icon' name='edit-alt' color='#ffb17ae5'></i>
          </button>
        </td>
        <td>
          <button class="delete" id='${info.id}'>
            <i class='bx bx-trash icon-trash' name='trash' color='#EC5766'></i>
          </button>
        </td>
      </tr>
      `
    );
  });
};
