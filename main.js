
alert("¡BIENVENIDO A TISIO JOYERÍAS!");

const nombre = prompt("Para acceder a la tienda, ingresa tu nombre");

let costoTotal = 0;

const productos = [
    { 
        id: 1, 
        nombre: "Chain de Acero 800", 
        precio: 20000 
    },
    { 
        id: 2, 
        nombre: "Aros Argolla Ancha", 
        precio: 5700 
    },
    { 
        id: 3, 
        nombre: "Anillo Full Ice", 
        precio: 80000 
    },
    { 
        id: 4, 
        nombre: "Aros Cristal colores", 
        precio: 4300 
    },
    { 
        id: 5, 
        nombre: "Dije 0800 God", 
        precio: 35000 
    }
];

let catalogo = "Catálogo:\n\n";
productos.forEach(producto => {
    catalogo += producto.id + " - " + producto.nombre + " | Precio: $ " + producto.precio + "\n";
});

function comprarProducto() {
    let option = parseInt(prompt(catalogo + "\n0 - Finalizar compra"));

    if (option === 0) {
        if (costoTotal > 0) {
            alert("Gracias por tu compra, " + nombre + "! \nEl costo total es: $" + costoTotal);
        } else {
            alert("Gracias por visitar, ¡Vuelve pronto!");
        }
        return;
    }

    if (option < 1 || option > productos.length) {
        alert("Opción inválida");
    } else {
        const productoSeleccionado = productos.find(e => e.id === option);
        const cantidad = parseInt(prompt("Ingresa la cantidad de productos que deseas comprar"));

        if (cantidad <= 0) {
            alert("Cantidad inválida");
        } else {
            costoTotal += cantidad * productoSeleccionado.precio;
            alert("Producto(s) añadido(s) al carrito.");
        }
    }

    comprarProducto(); 
}

comprarProducto();