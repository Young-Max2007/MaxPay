// Script para simular o recebimento de PIX ao clicar no QR Code.
document.addEventListener("DOMContentLoaded", function () {
    
    const imgBotaoReceber = document.getElementById("imgBotaoReceber");

    if (imgBotaoReceber) {
        imgBotaoReceber.addEventListener("click", function (e) {
            e.preventDefault();

            // Valores de transação SIMULADOS (gambiarra para mostrar a funcionalidade).
            const valorRecebido = 5000.00;
            const origem = "Ruan Max";
            const moeda = "brl";

            const saldoAtual = getSaldo(moeda);
            const novoSaldo = saldoAtual + valorRecebido;

            // 1. Adiciona o valor no saldo BRL.
            setSaldo(moeda, novoSaldo);

            // 2. Cria e registra o evento de recebimento no histórico.
            const transacao = {
                id: Date.now(),
                tipo: 'PIX (Recebimento)',
                data: new Date().toLocaleDateString('pt-BR'),
                hora: new Date().toLocaleTimeString('pt-BR'),
                valor: valorRecebido.toFixed(2),
                moedaDe: 'BRL',
                moedaPara: 'BRL',
                destino: origem, 
                status: 'Concluído'
            };

            if (typeof addHistorico === 'function') {
                addHistorico(transacao);
            }

            // 3. Alerta o usuário sobre o recebimento.
            alert(`Você recebeu R$: ${valorRecebido.toFixed(2)} de ${origem}!`);
        });
    }
});