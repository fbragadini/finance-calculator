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

/* TRACKER */
const htmlTrackerTotal = document.getElementById("trackerTotal");
let trackerResult = 0;
let trackerEntries = [];
let counter =  1;
const trackerTable = document.getElementById("trackertable");
let dollarUSLocale = Intl.NumberFormat('en-US');

class Entry {
    constructor (date, description, type, amount) {
        this.id = counter;
        this.date = date;
        this.description = description;
        this.type = type;
        this.amount = amount;
    }
}

function newEntry() {
    const trackerEntry = document.getElementById("trackerForm")
    const newEntry = new Entry(trackerEntry.entryDate.value, trackerEntry.entryDescription.value, trackerEntry.entryType.value, parseInt(trackerEntry.entryAmount.value));
    trackerEntries.push(newEntry);
    counter++;
    console.log(trackerEntries);
    updateTracker();
    getResult();
    saveEntries();
}

function updateTracker() {
    trackerTable.innerHTML = ""
    trackerEntries.forEach((entry) => {    
    const entryHTML = document.createElement('tr');
    entryHTML.innerHTML = `
        <th scope="row">${entry.date}</th> 
        <td>${entry.description}</td> 
        <td>${entry.type}</td> 
        <td>${entry.amount}</td>
        <td>
        <button class="deleteBtn" onclick="deleteEntry(event)" id="deleteBtn_${entry.id}">&#10060;</button>
        </td>
    `;    
    trackerTable.appendChild(entryHTML);
    })
};

function getResult() {
    trackerResult = 0;
    for (let i = 0; i < trackerEntries.length; i++) {
        if (trackerEntries[i].type == "income") {
                trackerResult += trackerEntries[i].amount;
            } else {
                trackerResult -= trackerEntries[i].amount;
            }
        }
    console.log(trackerResult);
    htmlTrackerTotal.innerText = '$' + dollarUSLocale.format(trackerResult);
}

function deleteEntry(event) {
    let btn = event.target;
    let id = btn.id.split("_")[1];
    trackerEntries = trackerEntries.filter((entry) => entry.id != id);
    updateTracker();
    getResult();
    saveEntries();
}

function saveEntries() {
    localStorage.setItem("Entradas", JSON.stringify(trackerEntries));
}

function loadEntries () {
    trackerEntries = JSON.parse(localStorage.getItem("Entradas"));
    updateTracker();
    getResult();
}

//botonCalc.addEventListener("click", calculadoraPF);
//botonCalcIntComp.addEventListener("change", calcIntComp);
loadEntries();