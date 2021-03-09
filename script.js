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

class Carrito {
  constructor(cantidadProductos, precio) {
    this.cantidad = cantidadProductos;
    this.precio = precio;
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
    <button class="btn" onclick='agregarAlCarrito(${JSON.stringify(
      listaProductos[i]
    )})'>Agregar al carrito</button>
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

function mostrarCemento() {}
