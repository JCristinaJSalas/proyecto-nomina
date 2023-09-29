// CRUD
import { editar } from "./editar.js";
//  ------------> Save information
export const saveData = (urlNomina) => {
    let formNomina = document.querySelector("#form-fill");
    formNomina.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      let config = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      };
      let res = await (await fetch(urlNomina, config)).json();
      console.log(res);
      location.reload();
    });
  };
//  ------------>  Delete
export const deleteData = async (urlNomina, idDelete) => {
    let config = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    let res = await (await fetch(urlNomina + `/${idDelete}`, config)).json();
    location.reload();
  };
  // ------------>  Calcular
export const calcular = (total) => {
    document.querySelector("#trFooter").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <td>$ ${total.toLocaleString("es-ES")}</td>
      `
    );
  };
//  ------------>  Read information
const tabla = document.querySelector("#body-tabla");
const modal = document.querySelector(".modal");

export const writeData = async (urlNomina) => {
  let res = await (await fetch(urlNomina)).json();
  let total = 0;
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

  botonesEditar.forEach((e) => {
    e.addEventListener("click", () => {
      const idEditar = e.id;
      modal.classList.add("modalShow");
      editar(idEditar, urlNomina);
    });
  });

  botonesEliminar.forEach((e) => {
    e.addEventListener("click", () => {
      const idDelete = e.id;
      deleteData(urlNomina, idDelete);
    });
  });
};