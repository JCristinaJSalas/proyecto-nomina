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