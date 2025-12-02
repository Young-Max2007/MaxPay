document.addEventListener("DOMContentLoaded", function () {

  const valorEl = document.getElementById("valor");
  const moedaDeEl = document.getElementById("moedaDe");
  const moedaParaEl = document.getElementById("moedaPara");
  const btnConverter = document.getElementById("btnConverter");
  const resultadoDiv = document.getElementById("resultado");

  // A função toNumber não é mais estritamente necessária,
  // mas se for usada em outro lugar, use a versão simplificada:
  function toNumber(value) {
    return parseFloat(value); 
  }

  function getConversionRate(de, para) {
    const taxas = {
      "BRL-USD": 0.20,
      "USD-BRL": 5.00,
      "BRL-EUR": 0.18,
      "EUR-BRL": 5.40,
      "USD-EUR": 0.92,
      "EUR-USD": 1.08
    };
    return taxas[`${de}-${para}`] || null;
  }

  btnConverter.addEventListener("click", function () {

    // 💡 CORREÇÃO: Usando parseFloat diretamente para garantir a leitura correta do decimal.
    const valor = parseFloat(valorEl.value); 
    const moedaDe = moedaDeEl.value;
    const moedaPara = moedaParaEl.value;

    if (isNaN(valor) || valor <= 0) {
      resultadoDiv.innerText = "Digite um valor válido.";
      return;
    }

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

    if (saldoOrigem < valor) {
      resultadoDiv.innerText = `Saldo insuficiente em ${moedaDe}.`;
      return;
    }

    const resultado = valor * taxa;

    // 💸 DESCONTA
    setSaldo(moedaDe.toLowerCase(), saldoOrigem - valor);

    // 💰 ADICIONA
    const saldoDestino = getSaldo(moedaPara.toLowerCase());
    setSaldo(moedaPara.toLowerCase(), saldoDestino + resultado);
    
    // ===========================
    // 📜 NOVO: REGISTRA A TRANSAÇÃO NO HISTÓRICO
    // (Requer que a função addHistorico esteja em saldos.js)
    // ===========================
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
    // Esta função deve ser implementada no saldos.js
    if (typeof addHistorico === 'function') {
        addHistorico(transacao);
    }
    // ===========================
    
    resultadoDiv.innerText =
      `Convertido: ${resultado.toFixed(2)} ${moedaPara}`;

    valorEl.value = "";
  });

});