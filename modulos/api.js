//Save information
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
// Eliminar
const deleteData = async (urlNomina, id) => {
  console.log(id);
  let config = {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  };
  let res = await (await fetch(urlNomina + `/${id}`, config)).json();
  location.reload();
};
// Calcular
const calcular = (total) => {
  document.querySelector("#trFooter").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <td>${total}</td>
    `
  );
};
//Editar funcion

const editar = async (id, urlNomina) => {
  const response = await (await fetch(`${urlNomina}/${id}`)).json();
  console.log(response);
  document.querySelector("#formEdit").insertAdjacentHTML("beforeBegin", /*html*/ `
    <label for= "montoNuevo" >Monto:</label>
    <input type="text" name="monto" value="${response.monto}" id= "montoNuevo">
    <p>Tipo de Gasto: ${response.eleccion} </p>
    <label for= "egresoNuevo" >Egreso</label>
    <input type="radio" name="egresoNuevo" value="egreso" id= "egresoNuevo" checked>
    <label for= "ingresoNuevo" >Ingreso</label>
    <input type="radio" name="ingresoNuevo" value="ingreso" id= "ingresoNuevo"> <br/>
    <label for="descripcion">Descripcion</label>
    <textarea name="descripcion" >${response.descripcion}</textarea>
    
  `)

};

// Read information
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
        /*html*/ `

        <td>${element.id}</td>
        <td>${element.monto}</td>
        <td>${element.eleccion}</td>
        <td>${element.descripcion}</td>
        <td><button class="edit" id="${element.id}" ><span class="material-symbols-outlined">edit</span></button></td>
        <td><button class="delete" id='${element.id}'><span class="material-symbols-outlined">delete</span></button></td>

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
};
