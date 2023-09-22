// Eliminar
export const deleteData = async (urlNomina, idDelete) => {
  let config = {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  };
  let res = await (await fetch(urlNomina + `/${idDelete}`, config)).json();
  location.reload();
};
