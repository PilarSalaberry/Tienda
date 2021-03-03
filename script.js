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
    <button class="btn" onclick='agregarAlCarrito(${JSON.stringify(
      listaProductos[i]
    )})'>Agregar al carrito</button>
      </div>
      `;
  }
  $('#productos').html(prod);
}

/* function consultaStock(idProducto) {
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
} */

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

$(document).ready(function () {
  $('.menu-wrap').click(function () {
    $('.menu').toggle(1000);
  });
});
