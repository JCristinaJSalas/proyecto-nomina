//import {calcular} from "./diferencia.js"
//import {editar} from "./editar.js"
//import {deleteData} from "./delete.js"

// Read information
const tabla = document.querySelector("#body-tabla");
const editBoton = document.querySelector(".edit");
const deleteBoton = document.querySelector(".delete")

export const writeData = (urlNomina) => {
  addEventListener("DOMContentLoaded", async () => {
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
              <button class="edit" id="${element.id}" >
                <box-icon name='edit-alt' color='#264bbde5'></box-icon>
              </button>
            </td>
            <td>
                <button class="delete" id='${element.id}'>
                  <box-icon name='trash' color='#cf1313' ></box-icon>
                </button>
            </td>
          </tr>
        `
      );
    });
  });





};

/*
export const writeData = (urlNomina) => {
  addEventListener("DOMContentLoaded", async () => {
    let res = await (await fetch(urlNomina)).json();
    let total = 0;
    res.map((element) => {
      element.eleccion === "ingreso"
        ? (total += parseInt(element.monto))
        : (total -= parseInt(element.monto));

      document.querySelector("#tabla").insertAdjacentHTML(
        "beforeend",
         `
        <tr class="cuerpo">
        <td>${element.id}</td>
        <td>$ ${parseFloat(element.monto).toLocaleString("es-ES")}</td>
        <td>${element.eleccion}</td>
        <td>${element.descripcion}</td>
        <td><button class="edit" id="${
          element.id
        }" ><box-icon name='edit-alt' color='#264bbde5' ></box-icon></button></td>
        <td><button class="delete" id='${
          element.id
        }'><box-icon name='trash' color='#cf1313' ></box-icon></button></td>
        </tr>
      `
      );
    });

    // Agregar event listeners para botones de edición y eliminación
    const botonesEditar = document.querySelectorAll(".edit");
    const botonesEliminar = document.querySelectorAll(".delete");
    calcular(total);

    botonesEditar.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("modalShow");
        const id = button.getAttribute("id");
        // Aquí puedes implementar la lógica para editar la información con el ID proporcionado

        editar(id, urlNomina);
      });
    });
    botonesEliminar.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = button.getAttribute("id");
        // Aquí puedes llamar a la función deleteData para eliminar la información con el ID proporcionado
        console.log(`Delete elemento con ID ${id}`);
        deleteData(urlNomina, id);
      });
    });
  });
};*/
