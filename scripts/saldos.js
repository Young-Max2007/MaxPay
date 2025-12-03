// ARQUIVO CENTRAL: Controla todos os saldos e o histórico de transações, 
// usando o LocalStorage para simular um banco de dados (persistência de dados).
// Esta é a BASE DE DADOS SIMULADA do projeto.

// Verifica se a moeda existe no LocalStorage e define um valor inicial se não existir.
function initSaldo(moeda, valorPadrao) {
  if (!localStorage.getItem(moeda)) {
    localStorage.setItem(moeda, valorPadrao.toString());
  }
}

// Inicializa os saldos padrão ao carregar o script.
initSaldo("brl", 2500.50);
initSaldo("usd", 0);
initSaldo("eur", 0);

// Pega o valor do saldo de uma moeda no LocalStorage e retorna como número.
function getSaldo(moeda) {
  return parseFloat(localStorage.getItem(moeda) || "0");
}

// Salva (atualiza) o valor do saldo de uma moeda no LocalStorage.
function setSaldo(moeda, valor) {
  localStorage.setItem(moeda, valor.toString());
}

// Calcula o valor total do patrimônio, convertendo USD e EUR para BRL.
function getSaldoTotalEmBRL() {
  const brl = getSaldo("brl");
  const usd = getSaldo("usd");
  const eur = getSaldo("eur");

  // Usa as taxas de câmbio simuladas para o cálculo total.
  return brl + (usd * 5.0) + (eur * 5.4);
}

// Pega o histórico completo de transações salvas.
function getHistorico() {
  const historico = localStorage.getItem("historico");
  return JSON.parse(historico) || []; // Retorna um array vazio se não houver histórico.
}

// Adiciona uma nova transação no histórico.
function addHistorico(data) {
  const historico = getHistorico();
  // Coloca a transação mais recente no topo do array.
  historico.unshift(data);
  localStorage.setItem("historico", JSON.stringify(historico));
}