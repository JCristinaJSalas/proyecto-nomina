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
  try {
    // Obtener los datos de la transacción con el ID especificado
    const response = await fetch(`${urlNomina}/${id}`);
    if (!response.ok) {
      console.error("Error al obtener la transacción para editar");
      return;
    }
    const transaction = await response.json();

    // Mostrar el formulario de edición con los datos de la transacción
    const formEdit = document.querySelector("#formEdit");
    formEdit.innerHTML = `
      <div><span class="material-symbols-outlined close">close</span></div>
      <input placeholder="${transaction.monto}" id="monto">
      <div class="container-radio">
        <label for="radio-egreso">Egreso</label>
        <input
          type="radio"
          name="eleccion"
          id="radio-egreso"
          required
          ${transaction.tipo === "egreso" ? "checked" : ""}
          value="egreso"
        />
      </div>
      <div class="container-radio">
        <label for="radio-ingreso">Ingreso</label>
        <input
          type="radio"
          name="eleccion"
          id="radio-ingreso"
          required
          ${transaction.tipo === "ingreso" ? "checked" : ""}
          value="ingreso"
        />
      </div>
      <input placeholder="${transaction.descripcion}">
      <button type="submit">Guardar</button>
    `;

    // Escuchar el evento submit del formulario de edición
    formEdit.addEventListener("submit", async (e) => {
      e.preventDefault();
      // Obtener los nuevos valores del formulario
      const nuevoMonto = document.getElementById("monto").value;
      const nuevoTipo = document.querySelector(
        'input[name="eleccion"]:checked'
      ).value;
      const nuevaDescripcion = document.getElementById("descripcion").value;

      // Crear un objeto con los datos actualizados
      const newData = {
        monto: nuevoMonto,
        tipo: nuevoTipo,
        descripcion: nuevaDescripcion,
      };

      // Enviar una solicitud PUT para actualizar la transacción
      const response = await fetch(`${urlNomina}/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        console.log("Transacción actualizada con éxito");
        // Volver a cargar los datos y recalcular el total
        loadData();
        calculateTotal();
      } else {
        console.error("Error al actualizar la transacción");
      }
    });
  } catch (error) {
    console.error("Error en la función editar:", error);
  }
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
