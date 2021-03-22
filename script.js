let carrito = [];

if (localStorage.getItem('carrito') != null) {
  carrito = JSON.parse(localStorage.getItem('carrito'));
  document.getElementById('cantidad').innerHTML = carrito.length;
}

actualizarCarrito();

let listaProductos = [];

$(document).ready(function () {
  $.ajax({
    url: '/data.json',
    dataType: 'json',
    success: function (data) {
      listaProductos = data;
      console.log(data);
      mostrarProductos(listaProductos);
    },
  });
});

class Producto {
  constructor(
    idProducto,
    nombreProducto,
    precioProducto,
    stockProducto,
    imgProducto,
    tipoProducto,
    descripcionProducto
  ) {
    this.id = idProducto;
    this.nombre = nombreProducto;
    this.precio = precioProducto;
    this.stock = stockProducto;
    this.imagen = imgProducto;
    this.tipo = tipoProducto;
    this.descripcion = descripcionProducto;
  }
}

let prod = ``;
function mostrarProductos() {
  for (let i = 0; i < listaProductos.length; i++) {
    prod += `
    <div class="producto">
      <img src="${listaProductos[i].imagen}" class="imagen" />
      <h3>${listaProductos[i].nombre}</h3>
      <p>${`$` + listaProductos[i].precio}</p>
      <input id="btn-agregar" class="btn" type="button"
      value="Agregar al carrito"
      onclick='agregarAlCarrito(${JSON.stringify(listaProductos[i])})'/>
      </div>
      `;
  }
  $('#productos').html(prod);
}

function actualizarCarrito() {
  let prodCarrito = ``;
  let suma = 0;
  for (let i = 0; i < carrito.length; i++) {
    suma = suma + carrito[i].precio;
    prodCarrito += `
    <div class="cardCarrito">
    </div>
    `;
  }
  $('#productosCarrito').html(prodCarrito);
  $('#precio').html(suma);
}

function agregarAlCarrito(nombreProducto) {
  const producto = carrito.find(
    (producto) => producto.id === nombreProducto.id
  );
  if (!!!producto) {
    carrito.push(nombreProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    let suma = 0;
    for (let i = 0; i < carrito.length; i++) {
      suma += carrito[i].precio;
    }
    $('#snackbar').html(`
    <p>Agregaste un producto al carrito</p>`);
    var s = document.getElementById('snackbar');
    s.className = 'show';
    setTimeout(function () {
      s.className = s.className.replace('show', '');
    }, 3000);

    $('#precio').html(suma);
    $('#cantidad').html(carrito.length);
    actualizarCarrito();
  } else {
    $('#snackbar').html('El producto ya existe en el carrito');
    var s = document.getElementById('snackbar');
    s.className = 'show';
    setTimeout(function () {
      s.className = s.className.replace('show', '');
    }, 3000);
  }
}

function vaciarCarrito() {
  let nuevoCarrito = [];
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  carrito = nuevoCarrito;
  $('#cantidad').html(0);
  $('#precio').html(0);
  actualizarCarrito();
}

$(document).ready(function () {
  $('.menu-wrap').click(function () {
    $('.menu').toggle(1000);
  });
});
