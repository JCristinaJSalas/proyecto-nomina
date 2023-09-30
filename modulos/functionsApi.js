// CRUD
import { editar } from "./editar.js";
//  ------------> Save information
export const saveData = async (urlNomina) => {
  try {
    const formNomina = document.querySelector("#form-fill");
    formNomina.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const res = await fetch(urlNomina, config);
      if (res.ok) {
        console.log("Datos guardados con éxito.");
        location.reload();
      } else {
        console.error("Error al guardar los datos.");
      }
    });
  } catch (error) {
    console.error("Error en saveData:", error);
  }
};

//  ------------>  Delete
// deleteData.js
export const deleteData = async (urlNomina, idDelete) => {
  try {
    const config = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(urlNomina + `/${idDelete}`, config);
    if (res.ok) {
      console.log("Datos eliminados con éxito.");
      location.reload();
    } else {
      console.error("Error al eliminar los datos.");
    }
  } catch (error) {
    console.error("Error en deleteData:", error);
  }
};
//  ------------>  Read information
const tabla = document.querySelector("#body-tabla");
const modal = document.querySelector(".modal");

export const writeData = async (urlNomina) => {
  let res = await (await fetch(urlNomina)).json();
  tabla.innerHTML = ""
  res.map((element) => {
    

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
              <i class='bx bx-edit-alt icon' name='edit-alt' color='#ffb17ae5'  ></i>
            </button>
          </td>
          <td>
            <button class="delete" id='${element.id}'>
              <i class='bx bx-trash icon-trash'name='trash'color='#EC5766'></i>
            </button>
          </td>
          </tr>
        `
        
    );
  });

  
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
// ------------>  Calcular
let total = 0;
let ingresos = 0
let egresos = 0
export const calcular = async(urlNomina) => {
  const data = await (await fetch(urlNomina)).json();
  data.map((e) =>{
    if (e.eleccion === "ingreso"){
      total += Number(e.monto)
      ingresos += Number(e.monto)
    }else{
      total -= Number(e.monto)
      egresos += Number(e.monto)
    }
  })
  return{total,ingresos,egresos};
}