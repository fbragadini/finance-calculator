//VARIABLES TRACKER GASTOS 
const htmlTrackerTotal = document.getElementById("trackerTotal");
let trackerResult = 0;
let trackerEntries = [];
let counter =  1;
const trackerTable = document.getElementById("trackertable");
let dollarUSLocale = Intl.NumberFormat('en-US');
let chartTracker = [];

// VARIABLES CHART

let labels = []

let data = {
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

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

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

class ChartLog {
    constructor (description, id, amount) {
        this.description = description;
        this.id = id;
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
    const newLog = new ChartLog(newEntry.description, newEntry.id, trackerResult);
    chartTracker.push(newLog);
    getResult();
    resetChart();
    updateChart();
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
            chartTracker[i].amount = trackerResult;
        } else {
            trackerResult -= trackerEntries[i].amount;
            chartTracker[i].amount = trackerResult;
        }
    }
    htmlTrackerTotal.innerText = '$' + dollarUSLocale.format(trackerResult);
}

function deleteEntry(event) {
    let btn = event.target;
    let id = btn.id.split("_")[1];
    trackerEntries = trackerEntries.filter((entry) => entry.id != id);
    chartTracker = chartTracker.filter((entry) => entry.id != id);
    updateTracker();
    getResult();
    resetChart();
    updateChart();
    saveEntries();
}

function saveEntries() {
    localStorage.setItem("Entradas", JSON.stringify(trackerEntries));
    localStorage.setItem("Chart", JSON.stringify(chartTracker));
}

function loadEntries() {
    if (trackerEntries.length > 0) {
        chartTracker = JSON.parse(localStorage.getItem("Chart"));
        trackerEntries = JSON.parse(localStorage.getItem("Entradas"));
        updateTracker();
        getResult();
        resetChart();
        updateChart();
    }
} 

loadEntries();

// CHART

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

    function resetChart() {
    for (let i = 0; i < data.labels.length; i = i) {
        removeData(myChart)
    }
    console.log(chartTracker);
    }

    function updateChart() {
        chartTracker.forEach((newLog) => {
        addData(myChart, newLog.description, newLog.amount)})
    };