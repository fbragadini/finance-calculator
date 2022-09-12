let nombre, monto, plazo, resultado;
let calcularInteresCompuesto = false;
const botonCalc = document.getElementById("botonCalcular");
const botonCalcIntComp = document.getElementById("calcIntComp");
const historialPrestamos = []
const tasa = 69.5;
const coeficiente = parseFloat(tasa/12);

class Prestamo {
    constructor(nombre, monto, plazo, resultado) {
        this.nombre = nombre;
        this.monto = monto;
        this.plazo = plazo;
        this.resultado = resultado;
        this.tasaInteres = "69.5%";
    }
}

function calculadoraPF() {
    if (calcularInteresCompuesto) {
        let userName = document.getElementById("userName").value
        let userMonto = parseFloat(document.getElementById("userMonto").value)  
        let userPlazo = parseInt(document.getElementById("userPlazo").value) 
        let userResultado = document.getElementById("userResultado")

        let montoConIntereses = (userMonto * (Math.pow((1 + 0.0579), userPlazo))).toFixed(2);
        const resultado = (montoConIntereses - userMonto).toFixed(2);

        let nuevoPrestamo = new Prestamo(userName, userMonto, userPlazo, resultado);
        console.log(nuevoPrestamo);
        
        userResultado.innerHTML =  `<div class="alert alert-success" role="alert"> Pasados ${userPlazo} meses, ${userName} habrá ganado $${resultado}. ¡El interés compuesto es genial!`;   

    } else {
        let userName = document.getElementById("userName").value
        let userMonto = parseFloat(document.getElementById("userMonto").value)  
        let userPlazo = parseInt(document.getElementById("userPlazo").value) 
        let userResultado = document.getElementById("userResultado")
        resultado = (((userMonto*coeficiente)/100)*userPlazo).toFixed(2);    
    
        let nuevoPrestamo = new Prestamo(userName, userMonto, userPlazo, resultado);
        console.log(nuevoPrestamo)
        
        userResultado.innerHTML = `<div class="alert alert-success" role="alert"> Pasados ${userPlazo} meses, ${userName} habrá ganado $${resultado}.</div>`;
    }
}

function calcIntComp() {
    if (this.checked) { 
        return calcularInteresCompuesto = true;        
    } else {
        return calcularInteresCompuesto = false;
    }
}

botonCalc.addEventListener("click", calculadoraPF);
botonCalcIntComp.addEventListener("change", calcIntComp);














/*function calculadoraPF() {
    nombre = (prompt("Ingresa tu nombre"));

    monto = parseFloat(prompt("Ingresa el monto a depositar en plazo fijo"));

    while (isNaN(monto) || (monto < 1))  {
        alert("Error. No ingresaste un número válido.");
        monto = parseFloat(prompt("Ingresa el monto a depositar en plazo fijo"));
    } 

    plazo = parseInt(prompt("Ingresa por cuantos meses realizaras tu plazo fijo."));

    while (isNaN(plazo) || (plazo < 1)) {
        alert("El valor ingresado no es valido.");
        plazo = parseInt(prompt("Ingresa por cuantos meses realizaras tu plazo fijo."))
    }
    
    resultado = (((monto*coeficiente)/100)*plazo).toFixed(2);

    let nuevoPrestamo = new Prestamo(nombre, monto, plazo, resultado);
    historialPrestamos.push(nuevoPrestamo);
    alert("Pasados " + plazo + " meses, " + nuevoPrestamo.nombre + " habrá ganado $" + resultado + ".");
    otraConsulta();   
    
}

function otraConsulta() {
    let respuesta = parseInt(prompt("Escribe 1 para realizar otra consulta, 2 para revisar el historial de prestamos y 3 para salir"));
    switch (respuesta) {
        case 1: 
            calculadoraPF();
            break;
        case 2:
            alert("El historial de los prestamos solicitados se ha impreso en la consola del navegador.")
            console.log(historialPrestamos);
            otraConsulta();
            break;
        case 3:
        default:
            alert("¡Gracias por usar nuestro servicio!");
            break;
    }
}
*/







/*function calcularMonto(monto, plazo) {
    resultado = (((monto*coeficiente)/100)*plazo).toFixed(2);
    alert("Pasados " + plazo + " meses, habrás ganado $" + resultado + ".");
    nuevoPrestamo.resultado = resultado;
    console.log(nuevoPrestamo);
    historialPrestamos.push(resultado)
    otraConsulta();
    return resultado;
    
}*/

/*function otraConsulta() {
    let respuesta = prompt("Para realizar otra consulta, ingrese 'Si'");
    if ((respuesta == "si") || (respuesta == "Si") || (respuesta =="SI") || (respuesta == "sI")) {
        calculadoraPF();
    } else {
        alert("Historial de Calculos")
        for (let i = 0; i < historialPrestamos.length; i++) {
            alert("Calculo N°" + parseInt(i + 1) + ": $." + historialPrestamos[i])
        }
        alert("¡Gracias por usar nuestro servicio!");
    }

} */




