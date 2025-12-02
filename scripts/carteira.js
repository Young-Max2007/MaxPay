document.addEventListener("DOMContentLoaded", function () {

  const saldoBRL = document.getElementById("saldo-brl");
  const saldoUSD = document.getElementById("saldo-usd");
  const saldoEUR = document.getElementById("saldo-eur");

  function atualizarCarteira() {

    if (saldoBRL) {
      saldoBRL.innerText = "Saldo: R$ " + getSaldo("brl").toFixed(2);
    }

    if (saldoUSD) {
      saldoUSD.innerText = "Saldo: $ " + getSaldo("usd").toFixed(2);
    }

    if (saldoEUR) {
      saldoEUR.innerText = "Saldo: € " + getSaldo("eur").toFixed(2);
    }

  }

  atualizarCarteira();
});