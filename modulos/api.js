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
    <td>$ ${total.toLocaleString("es-ES")}</td>
    `
  );
};
//Editar funcion

const editar = async (id, urlNomina) => {
  const response = await (await fetch(`${urlNomina}/${id}`)).json();

  document.querySelector("#formEdit").insertAdjacentHTML(
    "beforeBegin",
    /*html*/ `
    <label for= "montoNuevo" >Monto:</label>
    <input type="text" name="monto" value="${response.monto}" id= "montoNuevo">
    <div class="container-radio">
        <label for="radio-egreso">Egreso</label>
        <input
          type="radio"
          name="eleccion"
          id="radio-egreso"
          required
          ${response.eleccion === "egreso" ? "checked" : ""}
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
          ${response.eleccion === "ingreso" ? "checked" : ""}
          value="ingreso"
        />
      </div><br/>
    <label for="descripcion">Descripcion</label>
    <textarea name="descripcion" id="descripcionNueva" >${
      response.descripcion
    }</textarea>
    <div class="container-boton">
          <input type="submit" value="Guardar" />
          <div><box-icon name='x'></box-icon></div>
    </div>
  `
  );
  document.querySelector("#formEdit").addEventListener("submit", async (e) => {
    e.preventDefault();
    const montoNuevo = document.querySelector("#montoNuevo").value;
    const nuevoTipo = document.querySelector(
      'input[name="eleccion"]:checked'
    ).value;
    const nuevaDescripcion = document.querySelector("#descripcionNueva").value;

    const nuevaData = {
      id,
      monto: montoNuevo,
      tipo: nuevoTipo,
      descripcion: nuevaDescripcion,
    };
    const res = await fetch(`${urlNomina}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(nuevaData),
    });
    location.reload();
  });
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
