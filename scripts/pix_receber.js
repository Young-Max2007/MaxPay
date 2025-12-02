document.addEventListener("DOMContentLoaded", function () {
    
    const imgBotaoReceber = document.getElementById("imgBotaoReceber");

    if (imgBotaoReceber) {
        imgBotaoReceber.addEventListener("click", function (e) {
            e.preventDefault();

            const valorRecebido = 5000.00;
            const origem = "Ruan Max";
            const moeda = "brl";

            const saldoAtual = getSaldo(moeda);
            const novoSaldo = saldoAtual + valorRecebido;

            // 1. ATUALIZA SALDO
            setSaldo(moeda, novoSaldo);

            // 2. REGISTRA NO HISTÓRICO
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

            // 3. FEEDBACK VISUAL
            alert(`Você recebeu R$: ${valorRecebido.toFixed(2)} de ${origem}!`);
            
            // Opcional: Redirecionar para a tela principal do PIX após o recebimento (para ver o saldo atualizado)
            // window.location.href = 'pix.html';
        });
    }
});