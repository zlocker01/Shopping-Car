/* variables */
const carrrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

/* eventos */
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);

    /* elimina cursos del carrito */
    carrrito.addEventListener('click', eliminarCurso);

    /* vaciar el carrtio de compras */
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = [];

        limpiarHTML();
    });
};


/* functions */
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
};

/* eliminar curso del carrito */
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId  = e.target.getAttribute('data-id');
        //eliminar dle array
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML();
    }
};

/* leer el contenido del html y extraer info del curso*/
function leerDatosCurso(curso){
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    /* revisar si un elementos a esta dentro del carrito */
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //elementos duplicados
            }else{
                return curso; //elementos no duplicados
            };
        });
    }else{
    /* agregar elementos a la lista de compras del carrito */
    articulosCarrito = [...articulosCarrito, infoCurso];
};

    carritoHTML();
};


/* muestra el carrtio de compras en el htmml */
function carritoHTML(){
    /* limpair html */
    limpiarHTML();

    articulosCarrito.forEach(curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('TR');
        row.innerHTML = `<td><img src=${imagen}" width="100px"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}">x</a></td>`
        /* agrega html del carrito en el tbody */
        contenedorCarrito.appendChild(row);
    });
};

/* eliminar lso curso sprevios del tbody */
//fomra lenta de limpair html
// function limpairHTML(){
//     contenedorCarrito.innerHTML = '';
// };
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)};
};

/* localstorage */