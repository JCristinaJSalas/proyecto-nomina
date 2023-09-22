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
    <div class="input-container">
      <label for="monto" class="label">Cantidad</label>
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
    <div class="contenedor-radios">
    <div class="container-radio">
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

  <div class="container-radio">
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
    <div class="container-descripcion">
      <label for="descripcion">Descripcion</label>
      <textarea
        name="descripcion"
        id="descripcionNueva"
        cols="30"
        rows="10"
      >${response.descripcion}</textarea>
    </div>
    <div class="container-boton">
    <input type="submit" value="EDITAR" />
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
