// ==============================
// CONTROLADOR CENTRAL DE SALDOS
// ==============================

function initSaldo(moeda, valorPadrao) {
  if (!localStorage.getItem(moeda)) {
    localStorage.setItem(moeda, valorPadrao.toString());
  }
}

// Inicialização padrão do sistema
initSaldo("brl", 2500.50);
initSaldo("usd", 0);
initSaldo("eur", 0);

function getSaldo(moeda) {
  return parseFloat(localStorage.getItem(moeda) || "0");
}

function setSaldo(moeda, valor) {
  localStorage.setItem(moeda, valor.toString());
}

function getSaldoTotalEmBRL() {
  const brl = getSaldo("brl");
  const usd = getSaldo("usd");
  const eur = getSaldo("eur");

  return brl + (usd * 5.0) + (eur * 5.4);
}
// =============================
// HISTÓRICO DE TRANSAÇÕES
// =============================

function getHistorico() {
  const historico = localStorage.getItem("historico");
  // Retorna o array de histórico, ou um array vazio se não houver nada
  return JSON.parse(historico) || [];
}

function addHistorico(data) {
  const historico = getHistorico();
  // Adiciona a nova transação no INÍCIO do array
  historico.unshift(data);
  localStorage.setItem("historico", JSON.stringify(historico));
}