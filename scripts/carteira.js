// Script para atualizar e mostrar os saldos das moedas na página 'carteira.html'.
document.addEventListener("DOMContentLoaded", function () {

  // Referências aos elementos que mostram os saldos (BRL, USD, EUR).
  const saldoBRL = document.getElementById("saldo-brl");
  const saldoUSD = document.getElementById("saldo-usd");
  const saldoEUR = document.getElementById("saldo-eur");

  // Pega os valores reais usando a função do saldos.js e atualiza a interface.
  function atualizarCarteira() {

    // Só atualiza se o elemento existir na página.
    if (saldoBRL) {
      // O getSaldo("brl") é importado do saldos.js (módulo de controle de dados).
      saldoBRL.innerText = "Saldo: R$ " + getSaldo("brl").toFixed(2).replace('.', ',');
    }

    if (saldoUSD) {
      saldoUSD.innerText = "Saldo: $ " + getSaldo("usd").toFixed(2);
    }

    if (saldoEUR) {
      saldoEUR.innerText = "Saldo: € " + getSaldo("eur").toFixed(2);
    }

  }

  // Roda a função assim que a página é carregada.
  atualizarCarteira();
});