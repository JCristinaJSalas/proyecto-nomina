
const modal = document.querySelector(".modal");

//Editar funcion

export const editar = async (id, urlNomina) => {
  const response = await (await fetch(`${urlNomina}/${id}`)).json();
  document.querySelector("#formEdit").insertAdjacentHTML(
    "beforeBegin",
    /*html*/ `
    <div class="input-container">
        <label for="montoNuevo" class="label">Cantidad</label>
        <input type="number" id="montoNuevo" name="monto" class="text_input" autocomplete="off"
        value="${response.monto}" required />
    </div>
    <div class="contenedor-radios">
    <div class="container-radio">
      <label for="radio-egreso">Egreso</label>

      <input type="radio" name="eleccion" id="radio-egreso" required ${
        response.eleccion === "egreso" ? "checked" : ""
      }
      value="egreso" />

    </div>

    <div class="container-radio">
      <label for="radio/ingreso">Ingreso</label>
      <input type="radio" name="eleccion" id="radio/ingreso" required ${
        response.eleccion === "ingreso" ? "checked" : ""
      }
      value="ingreso"/>
    </div>
  </div>
    
<br/>
<div class="container-descripcion">
        <label for="descripcion">Descripcion</label>
        <textarea name="descripcion" id="descripcion" cols="30" rows="10" >${
          response.descripcion
        }</textarea>
      </div>


  </div>

  `
  );

  document.querySelector("#formEdit").addEventListener("submit", async (e) => {
    console.log(Object.entries(new FormData(  document.querySelector("#formEdit"))));
    e.preventDefault();

    const montoNuevo = document.querySelector("#montoNuevo").value;
    const nuevoTipo = document.querySelector(
      'input[name="eleccion"]:checked'
    ).value;
    const nuevaDescripcion = document.querySelector("#descripcionNueva").value;
    console.log(montoNuevo)

    const nuevaData = {
      monto: montoNuevo,
      tipo: nuevoTipo,
      descripcion: nuevaDescripcion,
    };

    console.log(nuevaData);
    let config = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(nuevaData),
    };
    let res = await (await fetch(urlNomina + `/${id}`, config)).json();
    console.log(res);
    location.reload();
  });

  document.querySelector(".botonCerrar").addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("modalShow");
    location.reload();
  });
};

