alert ("¡BIENVENIDO A TISIO JOYERIAS!")

const nombre = prompt ("Para acceder a la tienda, ingresar tu nombre");

function saludarPersona(){

    alert("Bienvenido/a a Tisio Joyerías, " + nombre)
};

saludarPersona()

let costoTotal = 0;

let option;

do {
    option = parseInt(prompt(
        "Seleccione el producto que desea llevar: \n\n1" +
        "- Chain de Acero 800  $20.000 \n2" +
        "- Aros Argolla Ancha  $5.700 \n3" +
        "- Anillo Full Ice  $80.000 \n4" +
        "- Aros Cristal colores  $4.300 \n5" +
        "- Dije 0800 God  $35.000 \n0" +
        "- Finalizar compra"
    ));
        

    switch (option) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:

        let cantidad = parseInt (prompt("Ingresa la cantidad de productos que desea comprar"

        ));

        let costoProducto = 0;

        switch (option) {

            case 1:
                costoProducto = 20000;
                break;
            case 2:
                costoProducto = 5700;
                break;
            case 3:
                costoProducto = 80000;
                break;
            case 4:
                costoProducto = 4300;
                break;
            case 5:
                costoProducto = 35000;
                break;
            };
        
        costoTotal = cantidad * costoProducto;
        alert("Producto(s) añadido(s) al carrito.");
        break;
        
        case 0:
            break;
        
        default: 
            alert("Opción inválida");
            break;
    };


} while (option !== 0);

if (costoTotal > 0) {
    alert ("Gracias por tu compra! \n" + "El costo total es: $" + costoTotal);
} else {
    alert ("Gracias por visitar,volve pronto!");
}