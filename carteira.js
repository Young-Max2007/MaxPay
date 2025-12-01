document.addEventListener("DOMContentLoaded", function () {

  // ==============================
  // INICIALIZA SALDOS SE NÃO EXISTIREM
  // ==============================
  if (!localStorage.getItem("usd")) {
    localStorage.setItem("usd", "0");
  }

  if (!localStorage.getItem("eur")) {
    localStorage.setItem("eur", "0");
  }

  // ==============================
  // BUSCA ELEMENTOS DA TELA
  // ==============================
  var saldoUSDElement = document.getElementById("saldo-usd");
  var saldoEURElement = document.getElementById("saldo-eur");

  function atualizarTela() {
    var saldoUSD = parseFloat(localStorage.getItem("usd"));
    var saldoEUR = parseFloat(localStorage.getItem("eur"));

    if (saldoUSDElement) {
      saldoUSDElement.innerText = "Saldo: $ " + saldoUSD.toFixed(2);
    }

    if (saldoEURElement) {
      saldoEURElement.innerText = "Saldo: € " + saldoEUR.toFixed(2);
    }
  }

  // ==============================
  // ATUALIZA AO ABRIR A PÁGINA
  // ==============================
  atualizarTela();

});