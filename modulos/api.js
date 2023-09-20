
let formNomina = document.querySelector("form");

//Save information

export const saveData = (urlNomina) => {
  formNomina.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const { monto } = data;
    Number(monto)

    let config = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    };
    let res = await (await fetch(urlNomina, config)).json();
    console.log(res)
  })
}


// Read information
const tabla = document.querySelector("#table")
export const writeData = (urlNomina) => {
  addEventListener("DOMContentLoaded", async () => {
    let res = await (await fetch(urlNomina)).json();
    res.forEach(element => {
      tabla.insertAdjacentHTML("beforeend", /*html*/`

        <td>${element.id}</td>
        <td>${element.monto}</td>
        <td>${element.eleccion}</td>
        <td>${element.descripcion}</td>
        <td><button id="edit" ><span class="material-symbols-outlined">edit</span></button></td>
        <td><button><span class="material-symbols-outlined">delete</span></button></td>
      `
      )
    });
  });

}


// Edit information

export const editData = (urlNomina) => {
  
}

// Delete information
let editNomina = document.querySelector("#edit");
export const deleteData = (urlNomina) => {
  editNomina.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const { monto } = data;
    Number(monto)

    let config = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    };
    let res = await (await fetch(urlNomina, config)).json();
    console.log(res)
  })
}