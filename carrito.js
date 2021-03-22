let carrito = [];
let textoVacio = `<p class="carrito-vacio">Tu carrito esta vacio</p>
<div class="vacio">
<a class="vacio-a" href="index.html"><i class="fas fa-angle-right"></i>Ir a comprar! </a></div>`;
let agregados = ``;

if (localStorage.getItem('carrito') != null) {
  carrito = JSON.parse(localStorage.getItem('carrito'));
  document.getElementById('cantidad').innerHTML = carrito.length;
}

actualizarCarrito();

$(document).ready(function () {
  $('.menu-wrap').click(function () {
    $('.menu').toggle(1000);
  });
});

function actualizarCarrito() {
  let prodCarrito = ``;
  let suma = 0;
  for (let i = 0; i < carrito.length; i++) {
    suma += carrito[i].precio;
    prodCarrito += `
    <div class="cardCarrito">
    </div>
    `;
  }
  $('#productosCarrito').html(prodCarrito);
  $('#precio').html(suma);
}

function vaciarCarrito() {
  let nuevoCarrito = [];
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  carrito = nuevoCarrito;
  $('#cantidad').html(0);
  $('#precio').html(0);
  actualizarCarrito();
  $('#agregados').html(textoVacio);
  $('#total').css('display', 'none');
}

function mostrarAgregados() {
  let precioT = 0;
  carrito = JSON.parse(localStorage.getItem('carrito'));
  agregados = ``;
  for (let i = 0; i < carrito.length; i++) {
    precioT += carrito[i].precio;
    agregados += `
    <div class="card-producto">
      <div class="img-carrito">
        <img src="${carrito[i].imagen}" class="imagen-carrito" />
      </div>
      <div class="name">
        <p>${carrito[i].nombre}</p>
      </div>
      <div class="precio">
        <p>$${carrito[i].precio}</p>
      </div>
      <div>
       <button class="x-carrito" onclick="borrarProducto(${carrito[i].id})">Borrar producto</button>
      </div>
  </div>
    `;
  }

  total = `<p>Total: $${precioT}</p>`;
  if (agregados !== ``) {
    $('#agregados').html(agregados);
    $('#total').html(total);
  } else {
    $('#total').css('display', 'none');
    $('#carrito-vacio').css('display', 'none');
    $('#agregados').html(textoVacio);
  }
  actualizarCarrito();
}

mostrarAgregados();

function borrarProducto(id) {
  let nuevoCarrito = [];
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id != id) {
      nuevoCarrito.push(carrito[i]);
    }
  }
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  carrito = nuevoCarrito;
  actualizarCarrito();
  $('#cantidad').html(carrito.length);
  mostrarAgregados();
}

let nombre = document.getElementById('nombre');
let email = document.getElementById('email');
let telefono = document.getElementById('telefono');
let dni = document.getElementById('dni');
let direccion = document.getElementById('direccion');
let postal = document.getElementById('postal');
let alert = document.getElementById('alert');

function sendForm() {
  let form = document.getElementById('form');
  if (
    nombre.value === '' ||
    email.value === '' ||
    telefono.value === '' ||
    dni.value === '' ||
    direccion.value === '' ||
    postal === ''
  ) {
    alert.innerHTML = 'Por favor completa todos los campos para continuar';
  } else {
    form.reset();
    alert.innerHTML = 'Formulario enviado';
  }
  event.preventDefault();
  vaciarCarrito();
}
