// Lógica de conversão de câmbio entre moedas.
document.addEventListener("DOMContentLoaded", function () {

  // Elementos do formulário.
  const valorEl = document.getElementById("valor");
  const moedaDeEl = document.getElementById("moedaDe");
  const moedaParaEl = document.getElementById("moedaPara");
  const btnConverter = document.getElementById("btnConverter");
  const resultadoDiv = document.getElementById("resultado");

  // Tabela de taxas de conversão SIMULADAS (gambiarra para simular cotação de mercado).
  function getConversionRate(de, para) {
    const taxas = {
      "BRL-USD": 0.20,
      "USD-BRL": 5.00,
      "BRL-EUR": 0.18,
      "EUR-BRL": 5.40,
      "USD-EUR": 0.92,
      "EUR-USD": 1.08
    };
    // Monta a chave (ex: "BRL-USD") e busca a taxa.
    return taxas[`${de}-${para}`] || null;
  }

  btnConverter.addEventListener("click", function () {

    const valor = parseFloat(valorEl.value); 
    const moedaDe = moedaDeEl.value;
    const moedaPara = moedaParaEl.value;

    // Valida se o valor é válido.
    if (isNaN(valor) || valor <= 0) {
      resultadoDiv.innerText = "Digite um valor válido.";
      return;
    }

    // Não permite converter para a mesma moeda.
    if (moedaDe === moedaPara) {
      resultadoDiv.innerText = "Selecione moedas diferentes.";
      return;
    }

    const taxa = getConversionRate(moedaDe, moedaPara);
    if (!taxa) {
      resultadoDiv.innerText = "Conversão indisponível.";
      return;
    }

    const saldoOrigem = getSaldo(moedaDe.toLowerCase());

    // Valida se o usuário tem saldo para a conversão.
    if (saldoOrigem < valor) {
      resultadoDiv.innerText = `Saldo insuficiente em ${moedaDe}.`;
      return;
    }

    // Calcula o valor final convertido.
    const resultado = valor * taxa;

    // Processa o câmbio:
    // 1. Tira o valor da moeda de origem.
    setSaldo(moedaDe.toLowerCase(), saldoOrigem - valor);

    // 2. Adiciona o valor convertido na moeda de destino.
    const saldoDestino = getSaldo(moedaPara.toLowerCase());
    setSaldo(moedaPara.toLowerCase(), saldoDestino + resultado);
    
    // Cria o registro da transação.
    const transacao = {
        id: Date.now(),
        tipo: 'Conversão',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: new Date().toLocaleTimeString('pt-BR'),
        valor: valor.toFixed(2),
        moedaDe: moedaDe,
        moedaPara: moedaPara,
        resultado: resultado.toFixed(2)
    };
    
    // Adiciona ao histórico (função global do saldos.js).
    if (typeof addHistorico === 'function') {
        addHistorico(transacao);
    }
    
    // Mensagem de sucesso.
    resultadoDiv.innerText = `Sucesso! Você converteu ${valor.toFixed(2)} ${moedaDe} para ${resultado.toFixed(2)} ${moedaPara}.`;

  });
});