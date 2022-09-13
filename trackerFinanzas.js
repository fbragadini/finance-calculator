const trackerEntries = [];

class Entry {
    constructor (date, description, type, amount) {
        this.date = date;
        this.description = description;
        this.type = type;
        this.amount = amount;
    }
}

function newEntry() {
    const trackerEntry = document.getElementById("trackerEntry");
    const newEntry = new Entry(trackerEntry.entryDate.value, trackerEntry.entryDescription.value, trackerEntry.entryType.value, trackerEntry.entryAmount.value);
    trackerEntries.push(newEntry);
    console.log(trackerEntries);
}

function updateTracker() {
    trackerEntries.forEach((entry) => { 
    const table = document.getElementById("trackertable");
    table.innerHTML = `
    <tr>
    <th scope="row"> ${entry.date} </th> 
    <td>${entry.description}</td> 
    <td>${entry.type}</td> 
    <td>${entry.amount}</td>
    </tr>`;
    trackerEntry.appendChild(table);
    })
};