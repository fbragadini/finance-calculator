//VARIABLES TRACKER GASTOS 
const htmlTrackerTotal = document.getElementById("trackerTotal");
let trackerResult = 0;
let trackerEntries = [];
let counter =  1;
const trackerTable = document.getElementById("trackertable");
let dollarUSLocale = Intl.NumberFormat('en-US');

// VARIABLES CHART

const labels = []

const data = {
    labels: labels,
    datasets: [{
        label: 'Detalle de gastos',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};

const config = {
    type: 'line',
    data: data,
};

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
    updateTracker();
    getResult();
    addData(myChart, newEntry.date, trackerResult);
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
        trackerEntries[i].type == "Ingreso" ? trackerResult += trackerEntries[i].amount : trackerResult -= trackerEntries[i].amount;
        }
    htmlTrackerTotal.innerText = '$' + dollarUSLocale.format(trackerResult);
}

function deleteEntry(event) {
    let btn = event.target;
    let id = btn.id.split("_")[1];
    trackerEntries = trackerEntries.filter((entry) => entry.id != id);
    updateTracker();
    getResult();
    removeData(myChart);
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

// CHART

const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }
    
    function removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
    }
