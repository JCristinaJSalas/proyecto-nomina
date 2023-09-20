let formNomina = document.querySelector("form");

//Save information

export const saveData = (urlNomina) => {
  formNomina.addEventListener("submit", async (e) => {
    const data = Object.fromEntries(new FormData(e.target));
    const { monto } = data;
    Number(monto);

    let config = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };
    let res = await (await fetch(urlNomina, config)).json();
    console.log(res);
  });
};

// Eliminar

const deleteData = async(urlNomina, id) => {
  console.log(id)
  let config = {
    method: "DELETE",
    headers: { "content-type": "application/json" }
  };
  let res = await (await fetch(urlNomina+`/${id}`, config)).json();
  location.reload()

}


// Read information
export const writeData = (urlNomina) => {
  addEventListener("DOMContentLoaded", async () => {
    let res = await (await fetch(urlNomina)).json();
    res.map((element) => {
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

    botonesEditar.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = button.getAttribute("id");
        // Aquí puedes implementar la lógica para editar la información con el ID proporcionado
        console.log(`Editar elemento con ID ${id}`);
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


