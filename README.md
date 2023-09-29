<h1 align="center">Manejo de CRUD </h1>

<section>
  <h2>Descripcion</h2>
  <p>Bienvenido a la pagina creada para llevar cuentas basicas de los hogares. Aqui manejamos una pequena base de datos con JSON-SERVER</p>
</section>

<section>
  <h2>Contenido</h2>
  <p>La pagina esta dividida en secciones:</p>
  <ul>
    <li>Formulario</li>
    <li>Seccion de busqueda</li>
    <li>Tabla de Informacion</li>
  </ul>
</section>
<hr>
<h2 >Descripcion de la Plataforma</h2>
<section>
  <h4>Formulario</h4>
  <p>En esta seccion se encuentra un pequeno formulario, basado en tres partes:</p>
  <ul>
    <li>Cantidad o Valor: Es el monto que se agregara en numeros y en COP.</li>
    <li>Tipo de Gasto: Se debe elegir el tipo de gasto al cual se debe hacer referencia.</li>
    <li>Descripcion: Un text-area dedicado a una pequena descripcion del gasto que se realiza. Esto, con el fin de detallar mas el mismo.</li>
  </ul>
</section>
<section>
  <h4>Seccion de busqueda</h4>
  <p>Esta seccion tiene la funcionalidad de filtrar y buscar informacion en la api con un value dado.</p>
</section>

<section>
  <h4>Tabla de Informacion</h4>
  <p>Esta tabla se usa especificamente para mostrar en pantalla la informacion que hay almacenada en la API. Destacando el numero de ID, el valor del gasto, el tipo de Gasto, un boton de Editar y un boton de Eliminar.<br> En el final de la tabla se agrega el total de los gasto (ingresos y egresos), teniendo encuenta que los gastos de ingreso son siempre positivos y los datos de egreso son siempre negativos.</p>
</section>

<section>
  <h2>Como se usa?</h2>
  <p>Esta pagina de nomina es creada de manera sencilla y clara. Manejando formularios simples y botones comodos al usuario. Esto con el fin de tener una excelente interaccion. <br> El usuario tendra que agregar el valor del gasto en COP, luego elegira el tipo de gasto al cual pertenece, y antes de enviar la informacion debera ingresar una descripcion.</p>
  <p>La tabla de informacion posee dos botones interactivos, en donde el usuario tendra la posibilidad de editar o eliminar el gasto.</p>
</section>

<section>
  <h2>Tecnologias</h2>
  <p>Para este proyecto se utilizaron tecnologias y lenguajes como:</p>
  <ul>
    <li>HTML: Se utiliza para la estructuracion de la pagina web.</li>
    <li>CSS: Se usa CSS puro para agregar estilos a nuestra pagina.</li>
    <li>Javascript: Se encarga de la logica y el manejo del DOM y la API.</li>
    <li>Boxicons: Agregara iconos a nuestros botones.</li>
    <li>Mockapi: Plataforma para el manejo y creacion de API.</li>
  </ul>
</section>


<section>
  <h2>Comados para el programador</h2>
  <p>A continuacion se detallara mas acerca de la url y se da detalle del JSON-server:</p>

#### GET all items

**Method** : `GET`

**URL** : `http://127.0.54.1:5414/nomina`

**Storage** : `src/modules/`

**Module** : `update` 

**Querys** : `(tabla)`

**Autho Required** : `false`

```javascript
{
 "nomina": [
    {
      "monto": "700000",
      "eleccion": "egreso",
      "descripcion": "Arriendo Julio 2023",
      "id": 1
    },
    ...
  ]
}
```




#### POST items

**Method**: `POST`

**URL** : `http://127.0.54.1:5414/nomina`

**Storage** : `src/modules/`

**Module** : `createData` 

**Querys** : `(data)`

**Auth Required** : `False`

```javascript
{
 "nomina": [
    {
      "monto": "700000",
      "eleccion": "egreso",
      "descripcion": "Arriendo Julio 2023",
      "id": 1
    },
    ...
  ]
}
```


#### Delete Item

```http
  DELETE http://127.0.54.1:5414/nomina/:id1
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### PUT

```http
  PUT http://127.0.54.1:5414/nomina/:id1
```

| Parameter     | Type     | Description                |
| :------------ | :------- | :------------------------- |
| `id`          | `number` | **Required**. Your API key |
| `monto`       | `number` | **Required**               |
| `eleccion`    | `string` | **Required**               |
| `descripcion` | `string` | **Required**               |

</section>



<footer>
 <p>Pagina creada con motivos de educacion. Creado por Cristina Salas, estudiante de CampusLands.</p>
    <p>[ * Instagram](https://www.instagram.com/criistiinasalas/)</p>
    <p>[ * Github - JCristinaJSalas](https://github.com/JCristinaJSalas)</p>
    <p>*Gmail: criistiinajerez@gmail.com</p>
</footer>

