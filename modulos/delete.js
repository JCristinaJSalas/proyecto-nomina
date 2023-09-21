// Eliminar
export const deleteData = async (urlNomina, id) => {
    console.log(id);
    let config = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    let res = await (await fetch(urlNomina + `/${id}`, config)).json();
    location.reload();
  };