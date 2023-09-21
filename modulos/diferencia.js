// Calcular
export const calcular = (total) => {
    document.querySelector("#trFooter").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <td>$ ${total.toLocaleString("es-ES")}</td>
      `
    );
  };