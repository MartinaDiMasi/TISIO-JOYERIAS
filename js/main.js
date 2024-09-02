let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch(`./data.json`)
    .then(response => response.json())
    .then(data => {
        data.forEach(el => crearCard(el));

        const botones = document.getElementById("botones");
        botones.className = "botones";

        const mostrarCarrito = document.createElement("button");
        mostrarCarrito.innerText = "Mostrar carrito";
        mostrarCarrito.className = "mostrarCarrito";

        mostrarCarrito.addEventListener("click", () => {
            const resumen = carrito.map(producto => `${producto.nombre} (x${producto.cantidad})  |  $${producto.precio * producto.cantidad}`).join('\n');
            Swal.fire({
                title: 'Tu carrito:',
                text: resumen,
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'color-button'
                }
            });
        });

        const limpiar = document.createElement("button");
        limpiar.innerText = "Limpiar carrito";

        limpiar.addEventListener("click", () => {
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito)); 
            Swal.fire({
                title: 'Carrito limpio',
                text: 'Tu carrito ha sido limpiado.',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'color-button'
                }
            });
        });

        const limpiarPrimero = document.createElement("button");
        limpiarPrimero.innerText = "Limpiar primer producto";

        limpiarPrimero.addEventListener("click", () => {
            carrito.shift();
            localStorage.setItem("carrito", JSON.stringify(carrito));  
            Swal.fire({
                title: 'Primer producto eliminado',
                text: 'El primer producto ha sido eliminado del carrito.',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'color-button'
                }
            });
        });

        const limpiarUltimo = document.createElement("button");
        limpiarUltimo.innerText = "Limpiar último producto";

        limpiarUltimo.addEventListener("click", () => {
            carrito.pop();
            localStorage.setItem("carrito", JSON.stringify(carrito));
            Swal.fire({
                title: 'Último producto eliminado',
                text: 'El último producto ha sido eliminado del carrito.',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'color-button'
                }
            });
        });

        const finalizarCompra = document.createElement("button");
        finalizarCompra.innerText = "Finalizar compra";
        finalizarCompra.className = "finalizarCompra";

        finalizarCompra.addEventListener("click", () => {
            if (carrito.length === 0) {
                Swal.fire({
                    title: 'Carrito vacío',
                    text: 'Tu carrito está vacío!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'color-button'
                    }
                });
                return;
        }

        const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        const resumen = carrito.map(producto => `${producto.nombre} (x${producto.cantidad})  |  $${producto.precio * producto.cantidad}`).join('\n');
            
        Swal.fire({
            title: 'Resumen de compra:',
            html: `Has llevado: ${resumen}<br><br><strong>Total de tu compra: $${total}</strong>`,
            confirmButtonText: 'COMPRAR !',
            customClass: {
                confirmButton: 'color-button'
            }
            }).then(() => {
                Swal.fire({
                    title: '¡Compra exitosa!',
                    text: 'Gracias por tu compra!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'color-button'
                    }
                });

                carrito = [];
                localStorage.setItem("carrito", JSON.stringify(carrito));
            });
        });

        botones.append(mostrarCarrito);
        botones.append(limpiar);
        botones.append(limpiarPrimero);
        botones.append(limpiarUltimo);
        botones.append(finalizarCompra);
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
    });

function agregarAlCarrito(producto) {
    const productoEnCarrito = carrito.find(el => el.id === producto.id);

    productoEnCarrito
        ? productoEnCarrito.cantidad += 1
        : carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    let carritoMensaje = carrito.reduce((mensaje, producto) => {
        return mensaje + `${producto.nombre} (x${producto.cantidad})  |  $${producto.precio * producto.cantidad}\n`;
    }, "");

    Toastify({
        text: `Agregado al carrito: \n\n${carritoMensaje}`,
        duration: 3000, 
        close: true, 
        gravity: "top", 
        position: "right",
        style: {
            background: "#131C3A"
        } 
    }).showToast();
};

const container = document.getElementById("contenedor");
container.className = "contenedor";

function crearCard(producto) {
    const card = document.createElement("div");
    card.className = "card";
    card.id = `user-${producto.id}`;

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.className = "img";

    const nombre = document.createElement("h3");
    nombre.innerText = `${producto.nombre}`;

    const precio = document.createElement("p");
    precio.innerText = `$${producto.precio}`;
    precio.className = "precio";

    const boton = document.createElement("button");
    boton.innerText = "Agregar al carrito";
    boton.className = "boton-agregar";
    boton.addEventListener("click", () => agregarAlCarrito(producto)); 

    card.append(imagen);
    card.append(nombre);
    card.append(precio);
    card.append(boton);

    container.append(card); 
};

