import { calcular } from "./diferencia.js";
import { editar } from "./editar.js";
import { deleteData } from "./delete.js";

// Read information
const tabla = document.querySelector("#body-tabla");
const modal = document.querySelector(".modal");

export const writeData = async (urlNomina) => {
  let res = await (await fetch(urlNomina)).json();
  let total = 0;

  //recorro la respuesta de la api
  res.map((element) => {
    element.eleccion === "ingreso"
      ? (total += parseInt(element.monto))
      : (total -= parseInt(element.monto));

    tabla.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
          <tr class="cuerpo">
            <td>${element.id}</td>
            <td>$ ${parseFloat(element.monto).toLocaleString("es-ES")}</td>
            <td>${element.eleccion}</td>
            <td>${element.descripcion}</td>
            <td>
            <button class="editBoton" id="${element.id}">
              <box-icon name='edit-alt' color='#264bbde5'></box-icon>
            </button>
          </td>
          <td>
            <button class="delete" id='${element.id}'>
              <box-icon name='trash' color='#cf1313'></box-icon>
            </button>
          </td>
          </tr>
        `
    );
  });

  calcular(total);
  const botonesEditar = document.querySelectorAll(".editBoton");
  const botonesEliminar = document.querySelectorAll(".delete");
  // botones de editar
  botonesEditar.forEach((e) => {
    e.addEventListener("click", () => {
      const idEditar = e.id;
      modal.classList.add("modalShow");
      editar(idEditar, urlNomina);
    });
  });
  // botones de eliminar
  botonesEliminar.forEach((e) => {
    e.addEventListener("click", () => {
      const idDelete = e.id;
      deleteData(urlNomina, idDelete);
    });
  });
};
