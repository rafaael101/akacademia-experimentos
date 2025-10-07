// aqui se carga todo el contenido de la página 
document.addEventListener('DOMContentLoaded', function() {

    // se busca el cubo en el HTML usando su ID
    const cube = document.querySelector('#movable-cube');

    // velocidad de movimiento
    const speed = 0.1;

    // eventos de presionar una tecla en todo el documento
    document.addEventListener('keydown', function(event) {
        
        // obtenemos la posición actual del cubo y obtenemos un objeto con A-Frame con las coordenadas x, y, z
        const position = cube.getAttribute('position');

        // switch para cambiar movimientos
        switch (event.key) {
            case 'ArrowUp':
                position.z -= speed; // hacia adelante (eje Z negativo)
                break;
            case 'ArrowDown':
                position.z += speed; // hacia atrás (eje Z positivo)
                break;
            case 'ArrowLeft':
                position.x -= speed; // a la izquierda (eje X negativo)
                break;
            case 'ArrowRight':
                position.x += speed; // a la derecha (eje X positivo)
                break;
            case 'q':
            case 'Q':
                position.y += speed; // hacia arriba (eje Y positivo)
                break;
            case 'e':
            case 'E':
                position.y -= speed; // hacia abajo (eje Y negativo)
                break;
        }

        // actualiza la posicion del cubo
        cube.setAttribute('position', position);
    });
});