document.addEventListener("DOMContentLoaded", function () {

    const formPixPagar = document.getElementById("formPixPagar");
    const saldoDisplay = document.getElementById("saldoAtualBRL");

    // Função para exibir o saldo BRL na tela de pagamento
    function updateSaldoDisplay() {
        // Verifica se getSaldo existe (carregado via saldos.js)
        if (typeof getSaldo === 'function') {
            const saldoBRL = getSaldo("brl");
            saldoDisplay.innerText = `R$ ${saldoBRL.toFixed(2).replace('.', ',')}`;
        }
    }

    if (saldoDisplay) {
        updateSaldoDisplay();
    }
    
    if (formPixPagar) {
        formPixPagar.addEventListener("submit", function (e) {
            e.preventDefault();

            const chavePix = formPixPagar.chavePix.value.trim();
            let valor = parseFloat(formPixPagar.valorPix.value);

            // 1. Validações
            if (chavePix.length < 5) {
                alert("Por favor, insira uma chave PIX válida.");
                return;
            }
            if (isNaN(valor) || valor <= 0) {
                alert("Valor PIX inválido.");
                return;
            }

            const saldoBRL = getSaldo("brl");

            if (saldoBRL < valor) {
                alert(`Saldo insuficiente em BRL. Seu saldo atual é R$ ${saldoBRL.toFixed(2)}.`);
                return;
            }

            if (!confirm(`Confirma o PIX de R$ ${valor.toFixed(2)} para a chave: ${chavePix}?`)) {
                return; // Usuário cancelou
            }

            // 2. Processamento
            
            // 💸 DESCONTA O SALDO BRL
            const novoSaldoBRL = saldoBRL - valor;
            setSaldo("brl", novoSaldoBRL);

            // 📜 REGISTRA A TRANSAÇÃO NO HISTÓRICO
            const transacao = {
                id: Date.now(),
                tipo: 'PIX (Transferência)',
                data: new Date().toLocaleDateString('pt-BR'),
                hora: new Date().toLocaleTimeString('pt-BR'),
                valor: valor.toFixed(2),
                moedaDe: 'BRL',
                moedaPara: 'BRL',
                destino: chavePix,
                status: 'Concluído'
            };
            
            if (typeof addHistorico === 'function') {
                addHistorico(transacao);
            }
            
            // 3. Feedback e Redirecionamento
            alert(`PIX de R$ ${valor.toFixed(2)} concluído com sucesso para ${chavePix}!`);

            // Volta para a tela principal do PIX
            window.location.href = 'pix.html';
        });
    }
});