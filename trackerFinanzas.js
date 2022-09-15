//VARIABLES TRACKER GASTOS 
const htmlTrackerTotal = document.getElementById("trackerTotal");
let trackerResult = 0;
let trackerEntries = [];
let counter =  1;
const trackerTable = document.getElementById("trackertable");
let dollarUSLocale = Intl.NumberFormat('en-US');

//CLASES

class Entry {
    constructor (date, description, type, amount) {
        this.id = counter;
        this.date = date;
        this.description = description;
        this.type = type;
        this.amount = amount;
    }
}

//FUNCIONES PARA EL TRACKER DE FINANZAS

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
        <button class="deleteBtn" onclick="deleteEntry(event)" id="deleteBtn_${entry.id}">
            &#10060;        
        </button>
        </td>
    `;    
    trackerTable.appendChild(entryHTML);
    })
};

function getResult() {
    trackerResult = 0;
    for (let i = 0; i < trackerEntries.length; i++) {
        if (trackerEntries[i].type == "Ingreso") {
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

function loadEntries() {
    trackerEntries = JSON.parse(localStorage.getItem("Entradas"));
    updateTracker();
    getResult();
}

loadEntries();