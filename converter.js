document.addEventListener("DOMContentLoaded", function () {

  var valorEl = document.getElementById("valor");
  var moedaDeEl = document.getElementById("moedaDe");
  var moedaParaEl = document.getElementById("moedaPara");
  var btnConverter = document.getElementById("btnConverter");
  var resultadoDiv = document.getElementById("resultado");

  // ==============================
  // GARANTE SALDOS INICIAIS
  // ==============================
  if (!localStorage.getItem("brl")) localStorage.setItem("brl", "1000"); // saldo inicial fake
  if (!localStorage.getItem("usd")) localStorage.setItem("usd", "0");
  if (!localStorage.getItem("eur")) localStorage.setItem("eur", "0");

  function toNumber(value) {
    return parseFloat(value.replace(",", "."));
  }

  function getConversionRate(de, para) {
    var taxas = {
      "BRL-USD": 0.20,
      "USD-BRL": 5.00,
      "BRL-EUR": 0.18,
      "EUR-BRL": 5.40,
      "USD-EUR": 0.92,
      "EUR-USD": 1.08
    };

    var chave = de + "-" + para;
    return taxas[chave] || null;
  }

  // ==============================
  // BOTÃO CONVERTER
  // ==============================
  btnConverter.addEventListener("click", function () {

    var valor = toNumber(valorEl.value);
    var moedaDe = moedaDeEl.value;
    var moedaPara = moedaParaEl.value;

    if (isNaN(valor) || valor <= 0) {
      resultadoDiv.innerText = "Digite um valor válido.";
      return;
    }

    if (moedaDe === moedaPara) {
      resultadoDiv.innerText = "As moedas são iguais.";
      return;
    }

    var taxa = getConversionRate(moedaDe, moedaPara);

    if (!taxa) {
      resultadoDiv.innerText = "Conversão indisponível.";
      return;
    }

    var resultado = valor * taxa;

    // ==============================
    // SALDOS
    // ==============================
    var saldoBRL = parseFloat(localStorage.getItem("brl"));
    var saldoUSD = parseFloat(localStorage.getItem("usd"));
    var saldoEUR = parseFloat(localStorage.getItem("eur"));

    // ==============================
    // DESCONTO E DEPÓSITO
    // ==============================
    if (moedaDe === "BRL") {
      if (saldoBRL < valor) {
        resultadoDiv.innerText = "Saldo insuficiente em BRL.";
        return;
      }
      saldoBRL -= valor;
      localStorage.setItem("brl", saldoBRL.toString());
    }

    if (moedaPara === "USD") {
      saldoUSD += resultado;
      localStorage.setItem("usd", saldoUSD.toString());
    }

    if (moedaPara === "EUR") {
      saldoEUR += resultado;
      localStorage.setItem("eur", saldoEUR.toString());
    }

    resultadoDiv.innerText =
      "Convertido: " + resultado.toFixed(2) + " " + moedaPara +
      " | BRL restante: R$ " + saldoBRL.toFixed(2);

    valorEl.value = "";

  });

});