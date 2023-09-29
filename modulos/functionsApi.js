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


//  ------------>  Read information
const tabla = document.querySelector("#body-tabla");
const modal = document.querySelector(".modal");


export const writeData = async (urlNomina) => {
  let res = await (await fetch(urlNomina)).json();
  
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

let total = 0;
let ingresos = 0
let egresos = 0
export const calcular = async(urlNomina) => {

  const data = await (await fetch(urlNomina)).json();
  
  console.log(data)

  data.map((e) =>{
    console.log(e)
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