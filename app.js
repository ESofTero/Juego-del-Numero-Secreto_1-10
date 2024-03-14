let maximosIntentos = 4;
let intentos = 1;
let listaNumerosSorteados = [];
let limiteDelNumeroSecreto = 10;

function presionarTecla() {
    teclaEnter = event.keyCode;

    if (teclaEnter == 13) {
        return verificarIntento();
    }
}

window.onkeydown = presionarTecla;

function estatusDeBotones () {
    //Para cuando se pierda o se gane
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.getElementById('intentar').setAttribute('disabled', true);
}

function verificarIntento () {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroUsuario === numeroSecreto) {
        asignarTexto('h1', '¡Ganaste!');    
        asignarTexto('p', `Has adivinado, el número secreto era ${numeroSecreto}, lo lograste en ${intentos} ${(intentos == 1 ? 'intento' : 'intentos')}`);
        estatusDeBotones();
        limpiarCaja();
    } else {
        if (numeroUsuario > numeroSecreto) {
            asignarTexto ('p', 'El número secreto es menor');
        } else {
            asignarTexto ('p', 'El número secreto es mayor');
        }
    limpiarCaja();
    intentos++;
    if (intentos > maximosIntentos) {
        asignarTexto ('h1', 'Perdiste...');
        asignarTexto ('p', 'Has perdido todas tus oportunidades, ¡Suerte para la próxima!');
        estatusDeBotones();
    } 
    return;
    }
}

function limpiarCaja() {
    document.getElementById('valorUsuario').value = "";
    return;
}

function mensajesIniciales() {
    asignarTexto ('h1', "Juego del Número Secreto");
    asignarTexto ('p', `Adivina el número: Escribe un número del 1 al ${limiteDelNumeroSecreto}, tienes ${maximosIntentos} intentos:`);
}

function condicionesIniciales () {
    mensajesIniciales();
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    limpiarCaja();
    console.log (numeroSecreto);
    document.getElementById('intentar').removeAttribute('disabled');
}

function nuevoJuego () {
    //activarse el boton de nuevo juego y desactivarse al picarlo
    document.getElementById('reiniciar').setAttribute('disabled', true);
    //darme otro numero secreto
    //borrar el numero del usuario
    //resetear los intentos
    condicionesIniciales();
    mensajesIniciales();
    return;
}

function generarNumeroSecreto () {
    let numeroSecreto = Math.floor(Math.random()*limiteDelNumeroSecreto)+1;

    if (listaNumerosSorteados.length == limiteDelNumeroSecreto) {
        asignarTexto ('h1', '¡Gracias por jugar!');
        asignarTexto ('p', 'El Juego del Número Secreto ha terminado porque ya se sortearon todos los números posibles.');
        document.getElementById('reiniciar').setAttribute('disabled', true);
        document.getElementById('intentar').setAttribute('disabled', true);
    } else {
        if (listaNumerosSorteados.includes(numeroSecreto)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push (numeroSecreto);
        }
        return numeroSecreto;
    }
}

function asignarTexto (elemento, texto) {
    let elementoHtml = document.querySelector (elemento);
    elementoHtml.innerHTML = texto;
    return;
}

condicionesIniciales();
mensajesIniciales();