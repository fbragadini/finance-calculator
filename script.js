// VARIABLES PLAZO FIJO

let nombre, monto, plazo, resultado;
let calcularInteresCompuesto = false;
const botonCalc = document.getElementById("botonCalcular");
const botonCalcIntComp = document.getElementById("calcIntComp");
const historialPrestamos = []
const tasa = 69.5;
const coeficiente = parseFloat(tasa/12);




//CLASES

class Prestamo {
    constructor(nombre, monto, plazo, resultado) {        
        this.nombre = nombre;
        this.monto = monto;
        this.plazo = plazo;
        this.resultado = resultado;
        this.tasaInteres = "69.5%";
    }
}



//FUNCIONES PARA CALCULADORA PLAZO FIJO

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
