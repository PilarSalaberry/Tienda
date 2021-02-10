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

let listaProductos = [];

let producto1 = new Producto(1, 'Maceta 1', 500, 4, 'Maceta de Piedras');
let producto2 = new Producto(2, 'Maceta 2', 600, 3, 'Maceta de Piedras');
let producto3 = new Producto(3, 'Maceta 3', 550, 5, 'Maceta de Cemento');
let producto4 = new Producto(4, 'Maceta 4', 350, 2, 'Maceta de Cemento');
let producto5 = new Producto(5, 'Maceta 5', 300, 1, 'Maceta de Cemento');

listaProductos.push(producto1);
listaProductos.push(producto2);
listaProductos.push(producto3);
listaProductos.push(producto4);
listaProductos.push(producto5);

let prod = ``;

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
</div>
  `;
}

document.getElementById('productos').innerHTML = prod;
