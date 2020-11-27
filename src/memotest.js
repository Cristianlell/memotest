let $felicitaciones = document.querySelector('.felicitaciones')
let $turnos = document.querySelector('.turnos')
let $ganaste = document.querySelector('.ganaste')
let $aciertos = document.querySelector('.aciertos')
let $empezar = document.querySelector('#empezar');
let $mostrarTurno = document.querySelector('.mostrarTurno')
    //con el spread operator convertimos el nodo de elementos en un array comun
let $arraycolumnas = [...document.querySelectorAll('.col-4')];
let $tablero = document.querySelector('.tablero');
let $titulo = document.querySelector('.titulo');
let colores = ['#51FF00', '#ffff00', '#0000ff', '#ff0000', '#00FFEB', '#EF00FF'];

let gris = ' #2b2929'


//Comienza el juego
$empezar.addEventListener('click', comenzarJuego);

function comenzarJuego() {
    $empezar.classList += ' ocultar'
    $tablero.classList.remove('ocultar')
    $mostrarTurno.classList.remove('ocultar')
    $titulo.classList += ' ocultar';
    mezclarVoltear();

}

function finDelJuego() {
    felicitaciones()

}

function mezclarVoltear() {
    // sumamos dos veces el mismo array en uno nuevo
    colores = colores.concat(colores)
    let mezcla = aleatorio(colores);
    //agrego los colores a cada div col-4
    $arraycolumnas.forEach((valor, indice) => {
        //Agrego id con el color para luego agregarlo al style
        valor.setAttribute('id', mezcla[indice])
        valor.setAttribute('data-id', indice)

        //agrego evento a clada columna
        valor.addEventListener('click', voltear)
    });
}

function felicitaciones() {

    $tablero.classList += ' ocultar'
    $felicitaciones.classList.remove('ocultar2')
    $ganaste.classList.remove('ocultar2')


}

function voltear() {
    //agrego el estilo que guarde en cada ID y lo paso al style 
    //al voltear la carta la guardamos en el array
    if (cartasElegidas.length < 2) {
        let data = this.getAttribute('data-id')

        this.setAttribute('style', `background: ${this.id}`);
        cartasElegidas.push(this.id);
        cartasElegidasId.push(data)
    }
    //chequeamos coincidencia
    chequear(cartasElegidas);

}
let turnos = 1;
let encontradas = 0;

function chequear(cartasElegidas) {
    if (cartasElegidas.length === 2) {
        $aciertos.textContent = turnos
        $turnos.classList.remove('ocultar')

        $aciertos.setAttribute('style', 'color: #5fd3d3')

        turnos++
        if (cartasElegidasId[0] === cartasElegidasId[1]) {
            //reiniciamos el comparador de id en cada condicion
            cartasElegidasId.length = 0
            volverAVoltear($arraycolumnas)
            interaccionOtravez()
        } else {
            $arraycolumnas.forEach(card => {
                card.removeEventListener('click', voltear)
            });
            if (cartasElegidas[0] === cartasElegidas[1]) {
                if (cartasElegidasId[0] === cartasElegidasId[1]) {
                    //reiniciamos el comparador de id
                    cartasElegidasId.length = 0
                    volverAVoltear($arraycolumnas)
                    interaccionOtravez()
                }

                encontradas++
                if (encontradas == 6) {
                    felicitaciones()
                }
                let uno = cartasElegidas[0]
                $arraycolumnas.forEach((e, index) => {
                    if (e.id == uno) {
                        setInterval(() => {
                            e.style.background = gris
                            e.removeAttribute('id')
                            e.removeEventListener('click', voltear)

                        }, 400);
                    }
                });
                //reiniciamos el comparador de id
                cartasElegidasId.length = 0
                cartasElegidas.length = 0
                interaccionOtravez()

            } else {
                cartasElegidasId.length = 0

                setTimeout(() => {
                    volverAVoltear($arraycolumnas)
                }, 600);
                interaccionOtravez()
            }
        }
    }
}

function volverAVoltear($arraycolumnas) {
    let uno = cartasElegidas[0]
    let dos = cartasElegidas[1]
        //si las cartas seleccionadas no son iguales las volvemos al color de 'atras' que tenian
    $arraycolumnas.forEach(e => {
        if (e.id == uno) {
            e.setAttribute('style', `background:#8d8b8b`);
            return
        }
        if (e.id == dos) {
            e.setAttribute('style', `background:#8d8b8b`)
            return
        }
    });
    interaccionOtravez()
    cartasElegidas.length = 0
}

function interaccionOtravez() {
    $arraycolumnas.forEach((valor, indice) => {
        valor.addEventListener('click', voltear)
    });
}

//Array para guardar cartas seleccionadas
let cartasElegidas = [];
let cartasElegidasId = [];

// Mezclamos los colores
function aleatorio(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1))
        let temp = cartas[i]
        cartas[i] = cartas[random]
        cartas[random] = temp
    }
    return cartas
}
//lo que hace este algoritmo es tomar el valor y tambiem el indice de cada vuelta y los intercambia con el numero que salga del random que seria un indice del array