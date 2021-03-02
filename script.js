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
    tipoProducto,
    imgProducto
  ) {
    this.id = idProducto;
    this.nombre = nombreProducto;
    this.precio = precioProducto;
    this.stock = stockProducto;
    this.tipo = tipoProducto;
    this.img = imgProducto;
  }
}

class Carrito {
  constructor(cantidadProductos, precioTotal) {
    this.cantidad = cantidadProductos;
    this.precio = precioTotal;
  }
}

/* let producto1 = new Producto(1, 'Maceta 1', 500, 1, 'Maceta de Piedras');
let producto2 = new Producto(2, 'Maceta 2', 600, 1, 'Maceta de Piedras');
let producto3 = new Producto(3, 'Maceta 3', 550, 1, 'Maceta de Cemento');
let producto4 = new Producto(4, 'Maceta 4', 350, 1, 'Maceta de Cemento');
let producto5 = new Producto(5, 'Maceta 5', 300, 1, 'Maceta de Cemento');

let listaProductos = [producto1, producto2, producto3, producto4, producto5]; */

let prod = ``;
function mostrarProductos() {
  for (let i = 0; i < listaProductos.length; i++) {
    prod += `
    <div class="producto">
    <img src="${
      `img/Producto` + listaProductos[i].id + `.jpeg`
    }" class="imagen" />
    <h3>${listaProductos[i].nombre}</h3>
    <p>${`$` + listaProductos[i].precio}</p>
    <button class="btn" onclick="consultaStock(${listaProductos[i].id})">
    Consultar Stock
    </button>
    <button class="btn" onclick='agregarAlCarrito(${JSON.stringify(
      listaProductos[i]
    )})'>Agregar al carrito</button>
      </div>
      `;
  }
  $('#productos').html(prod);
}

function consultaStock(idProducto) {
  let cantidad = Number(prompt('Ingrese la cantidad deseada'));
  for (let i = 0; i < listaProductos.length; i++) {
    if (listaProductos[i].id === idProducto) {
      if (listaProductos[i].stock >= cantidad) {
        alert('Hay stock');
      } else {
        alert('No hay stock');
      }
    }
  }
}

function actualizarCarrito() {
  let prodCarrito = ``;
  for (let i = 0; i < carrito.length; i++) {
    prodCarrito += `
    <div class="cardCarrito">
    </div>
    `;
  }
  $('#productosCarrito').html(prodCarrito);
}

/* <div class="agregados">
      <h3>${carrito[i].nombre}</h3>
      <p>${`$` + carrito[i].precio}</p>
    </div>
    <div>
      <button class="x-carrito" onclick="eliminarProducto(${
        carrito[i].id
      })"><i class="fas fa-times"></i></button>
    </div> */

function agregarAlCarrito(nombreProducto) {
  carrito.push(nombreProducto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  let suma = 0;
  for (let i = 0; i < carrito.length; i++) {
    suma += carrito[i].precio;
  }
  $('#producto-carrito').html(`
  <p class="popup">Agregaste un producto al carrito</p>`);
  $('#producto-carrito').slideDown(1000);
  setTimeout(function () {
    $('producto-carrito').slideUp(1000);
  }, 2500);
  $('#precioTotal').html(suma);
  $('#cantidad').html(carrito.length);
  actualizarCarrito();
}

function vaciarCarrito() {
  let nuevoCarrito = [];
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  carrito = nuevoCarrito;
  $('#cantidad').html(0);
  $('#precioTotal').html(0);
  actualizarCarrito();
}

function eliminarProducto(id) {
  let nuevoCarrito = [];
  let suma = 0;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id != id) {
      nuevoCarrito.push(carrito[i]);
      suma += carrito[i].precio;
    }
  }
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  document.getElementById('precioTotal').innerHTML = suma;
  carrito = nuevoCarrito;
  actualizarCarrito();
}

$(document).ready(function () {
  $('.menu-wrap').click(function () {
    $('.menu').toggle(1000);
  });
});
