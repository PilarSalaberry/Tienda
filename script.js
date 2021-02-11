let carrito = [];

if (localStorage.getItem('carrito') != null) {
  carrito = JSON.parse(localStorage.getItem('carrito'));
  document.getElementById('cantidad').innerHTML = carrito.length;
}

actualizarCarrito();

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

let producto1 = new Producto(1, 'Maceta 1', 500, 4, 'Maceta de Piedras');
let producto2 = new Producto(2, 'Maceta 2', 600, 3, 'Maceta de Piedras');
let producto3 = new Producto(3, 'Maceta 3', 550, 5, 'Maceta de Cemento');
let producto4 = new Producto(4, 'Maceta 4', 350, 2, 'Maceta de Cemento');
let producto5 = new Producto(5, 'Maceta 5', 300, 1, 'Maceta de Cemento');

let listaProductos = [producto1, producto2, producto3, producto4, producto5];

let prod = ``;
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

document.getElementById('productos').innerHTML = prod;

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
      <div class="agregados">
        <h3>${carrito[i].nombre}</h3>
        <p>${`$` + carrito[i].precio}</p>
      </div>
      <div>
        <button class="x-carrito"><i class="fas fa-times"></i></button>
      </div>
    </div>
    `;
  }
  document.getElementById('productosCarrito').innerHTML = prodCarrito;
}

function agregarAlCarrito(nombreProducto) {
  carrito.push(nombreProducto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  //sumar precio total
  let suma = 0;
  for (let i = 0; i < carrito.length; i++) {
    suma += carrito[i].precio;
  }
  document.getElementById('precioTotal').innerHTML = 'Total: $' + suma;
  document.getElementById('cantidad').innerHTML = carrito.length;
  actualizarCarrito();
}

function vaciarCarrito() {
  let nuevoCarrito = [];
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  carrito = nuevoCarrito;
  document.getElementById('cantidad').innerHTML = 0;
  document.getElementById('precioTotal').innerHTML = 'Total:';
  actualizarCarrito();
}
