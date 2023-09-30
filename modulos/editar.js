const modal = document.querySelector(".modal");
const formEditar = document.querySelector("#formEdit");
//Editar funcion
export const editar = async (id, urlNomina) => {
  const response = await (await fetch(`${urlNomina}/${id}`)).json();
  formEditar.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <div class="botonCerrar">
      <box-icon name="x" class="cerrar" ></box-icon>
    </div>
    <div class="input-container display">
      <label for="monto" class="label">Monto</label>
      <input
        type="number"
        id="montoNuevo"
        name="monto"
        class="text_input"
        autocomplete="off"
        value="${response.monto}"
        required
      />
    </div>
    <div class="contenedor-radios display">
    <div class="container-radio display">
    <label for="radio-egreso">Egreso</label>
    <input
      type="radio"
      name="eleccion-guardar"
      id="radio-egreso"
      required
      value="egreso"
      ${response.eleccion === "egreso" ? "checked" : ""}
    />
  </div>

  <div class="container-radio display">
    <label for="radio-ingreso">Ingreso</label>
    <input
      type="radio"
      name="eleccion-guardar"
      id="radio-ingreso"
      required
      value="ingreso"
      ${response.eleccion === "ingreso" ? "checked" : ""}
    />
  </div>
    </div>

    <div class="input-container">
    <textarea
      name="descripcion"
      id="descripcionNueva"
      class="text_input"
      placeholder ="${response.descripcion}"
      required
    >${response.descripcion}</textarea>
    <label for="descripcion" class="label">Descripcion</label>
  </div>


  <div class="contenedor-boton">
    <input type="submit" value="EDITAR" class="input-boton" />
  </div>

  `
  );
  const cerrar = document.querySelector(".botonCerrar");

  formEditar.addEventListener("submit", () => {
    saveEdit(id, urlNomina);
  });

  cerrar.addEventListener("click", () => {
    cerrarBoton();
  });
};

const saveEdit = async (id, urlNomina) => {
  const montoNuevo = document.querySelector("#montoNuevo").value;
  const nuevoTipo = document.querySelector(
    'input[name="eleccion-guardar"]:checked'
  ).value;
  const nuevaDescripcion = document.querySelector("#descripcionNueva").value;
  const nuevaData = {
    monto: montoNuevo,
    eleccion: nuevoTipo,
    descripcion: nuevaDescripcion,
  };
  let config = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(nuevaData),
  };
  let res = await (await fetch(urlNomina + `/${id}`, config)).json();
  location.reload();
};
const cerrarBoton = () => {
  modal.classList.remove("modalShow");
  location.reload();
};
