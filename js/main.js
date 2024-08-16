let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(producto){
        const productoEnCarrito = carrito.find(el => el.id === producto.id);

        productoEnCarrito
            ? productoEnCarrito.cantidad += 1
            : carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    let carritoMensaje = carrito.reduce((mensaje, producto) => {
        return mensaje + `${producto.nombre} (x${producto.cantidad})  |  $${producto.precio * producto.cantidad}\n`;
    }, "");

    alert(`ESTE ES TU NUEVO CARRITO:\n\n${carritoMensaje}`);
};


const container = document.getElementById("contenedor");
container.className = "contenedor"


function crearCard(producto) {

    const card = document.createElement("div");
    card.className = "card";
    card.id = `user-${producto.id}`


    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.className = "img";


    const nombre = document.createElement("h3");
    nombre.innerText = `${producto.nombre}`;


    const precio = document.createElement("p");
    precio.innerText = `$${producto.precio}`;
    precio.className = "precio"


    const boton = document.createElement("button");
    boton.innerText = "Agregar al carrito";
    boton.className = "boton-agregar"
    boton.addEventListener("click", () => agregarAlCarrito(producto)); 

    
    card.append(imagen)
    card.append(nombre);
    card.append(precio);
    card.append(boton)

    container.append(card); 
};

productos.forEach(el=> crearCard(el));

const botones = document.getElementById("botones");
botones.className = "botones"

const mostrarCarrito = document.createElement("button");
mostrarCarrito.innerText = "Mostrar carrito";
mostrarCarrito.classname = "mostrarCarrito"

mostrarCarrito.addEventListener("click", () => {

    const resumen = carrito.map(producto => `${producto.nombre} (x${producto.cantidad})  |  $${producto.precio * producto.cantidad}`).join('\n');
    alert("TU CARRITO:\n\n" + resumen);

});


const limpiar = document.createElement("button");
limpiar.innerText = "Limpiar carrito";

limpiar.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito)); //IMPORTANTE LINEA
});


const limpiarPrimero = document.createElement("button");
limpiarPrimero.innerText = "Limpiar primer producto";

limpiarPrimero.addEventListener("click", () => {
    carrito.shift();
    localStorage.setItem("carrito", JSON.stringify(carrito));  
});

const limpiarUltimo = document.createElement("button");
limpiarUltimo.innerText = "Limpiar último producto"

limpiarUltimo.addEventListener("click", () => {
    carrito.pop();
    localStorage.setItem("carrito", JSON.stringify(carrito));
});


const finalizarCompra = document.createElement("button");
finalizarCompra.innerText = "Finalizar compra";
finalizarCompra.className = "finalizarCompra";

finalizarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío!");
        return;
    };

    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    const resumen = carrito.map(producto => `${producto.nombre} (x${producto.cantidad})  |  $${producto.precio * producto.cantidad}`).join('\n');
    alert(`Has llevado:\n\n${resumen}\n\nTotal de tu compra: $${total}`);
    alert("¡LA COMPRA FUE EXITOSA!")

    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
});

botones.append(mostrarCarrito);
botones.append(limpiar);
botones.append(limpiarPrimero);
botones.append(limpiarUltimo);
botones.append(finalizarCompra);
