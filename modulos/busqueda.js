const inputBusqueda = document.querySelector("#busqueda");
const resultadoTabla = document.querySelector("#resultadoTabla");
const iconoBusqueda = document.querySelector('box-icon[name="search"]');

// Funcion para realizar la busqueda
export const busqueda = async (urlNomina) => {
  // evento co teclado"
  inputBusqueda.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      realizarBusqueda(urlNomina);
    }
  });

  // evento con la lupa
  iconoBusqueda.addEventListener("click", () => {
    realizarBusqueda(urlNomina);
  });
  // para telefono
  inputBusqueda.addEventListener("input", () => {
    realizarBusqueda(urlNomina);
  });
};

// Funcion  busqueda
const realizarBusqueda = async (urlNomina) => {
  // convertir la value a minuscula
  const terminoBusqueda = inputBusqueda.value.trim().toLowerCase();

  const data = await (await fetch(urlNomina)).json();

  // Filtro de data convirtiendolo a minuscula
  const resultadosFiltrados = data.filter((item) =>
    item.descripcion.toLowerCase().includes(terminoBusqueda)
  );
  inputBusqueda.value === "" ? resultadoTabla.innerHTML = "" : mostrarResultados(resultadosFiltrados);
};

// mostrar los resultados en la tabla
const mostrarResultados = (resultadosFiltrados) => {
  resultadoTabla.innerHTML = "";
  resultadoTabla.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
      <thead>
          <tr class="titulo">
              <td>Descripcion</td>
              <td>Tipo</td>
              <td>Valor (COP)</td>
          </tr>
      </thead>
      <tbody>
    `
  );
  resultadosFiltrados.forEach((resultado) => {
    resultadoTabla.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
          <tr>
              <td>${resultado.descripcion}</td>
              <td>${resultado.eleccion}</td>
              <td>$ ${parseFloat(resultado.monto).toLocaleString("es-ES")}</td>
          </tr>
        `
    );
  });
  resultadoTabla.insertAdjacentHTML("beforeend", /*html*/ `</tbody>`);
};
