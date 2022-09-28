//VARIABLES COTIZACIONES

let dollarUSLocale = Intl.NumberFormat('en-US');

//FETCH APIS

function cotizacionOficial() {
    fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolaroficial")
    .then((resp) => resp.json())
    .then((resp) => getData(resp));
}

function cotizacionBlue() {
    fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarblue")
    .then((resp) => resp.json())
    .then((resp) => getData(resp));
}

function cotizacionLiqui() {
    fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/contadoliqui")
    .then((resp) => resp.json())
    .then((resp) => getData(resp));
}

function cotizacionEuro() {
    fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/euro/nacion")
    .then((resp) => resp.json())
    .then((resp) => getData(resp));
}

function cotizacionBitcoin() {
    fetch("https://blockchain.info/ticker")
    .then((resp) => resp.json())
    .then((resp) => getDataBitcoin(resp));
}

//FUNCIONES CALCULOS

function getData(resp) {
    const data = resp;
    const fecha = data.fecha;
    const compra = parseFloat(data.compra);
    const venta = parseFloat(data.venta);
    const input = parseFloat(document.getElementById("input-el").value);
    getCalc(compra, venta, input);
}

function getDataBitcoin(resp) {
    const data = resp;
    const lastPrice = data['ARS']['last'];
    const input = parseFloat(document.getElementById("input-el").value);
    let resultBitcoin = dollarUSLocale.format(lastPrice * input);
    let resultadoHTML = document.getElementById("resultado");
    resultadoHTML.innerHTML = `
    <p class="alert alert-success" role="alert">La cotización solicitada para el Bitcoin es $${resultBitcoin}.</h3>
    `;;
}

function getCalc(compra, venta, input) {
    let resultCompra = dollarUSLocale.format(input * compra);
    let resultVenta = dollarUSLocale.format(input * venta);
    let resultadoHTML = document.getElementById("resultado");
    resultadoHTML.innerHTML = `
    <p class="alert alert-success" role="alert">La cotización solicitada es $${resultCompra} para la Compra y $${resultVenta} para la venta.</h3>
    `;
}

function calcular() {
    let option = document.getElementById("cotizacion").value;
    switch (option) {
        case "Oficial":
            cotizacionOficial();
            break;
        case "Blue":
            cotizacionBlue();
            break;
        case "Liqui": 
            cotizacionLiqui();
            break;
        case "Euro":
            cotizacionEuro();
            break;
        case "Bitcoin":
            cotizacionBitcoin();
            break;
    }
}

