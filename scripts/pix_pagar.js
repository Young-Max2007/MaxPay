// Script que processa a simulação de pagamento PIX (transferência de BRL).
document.addEventListener("DOMContentLoaded", function () {

    const formPixPagar = document.getElementById("formPixPagar");
    const saldoDisplay = document.getElementById("saldoAtualBRL");

    // Exibe o saldo atual do Real (BRL) na tela.
    function updateSaldoDisplay() {
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

            // Valida se os campos estão ok.
            if (chavePix.length < 5) {
                alert("Por favor, insira uma chave PIX válida.");
                return;
            }
            if (isNaN(valor) || valor <= 0) {
                alert("Valor PIX inválido.");
                return;
            }

            const saldoBRL = getSaldo("brl");

            // Confirma se há saldo suficiente.
            if (saldoBRL < valor) {
                alert(`Saldo insuficiente em BRL. Seu saldo atual é R$ ${saldoBRL.toFixed(2)}.`);
                return;
            }

            // Pede confirmação antes de simular a transação.
            if (!confirm(`Confirma o PIX de R$ ${valor.toFixed(2)} para a chave: ${chavePix}?`)) {
                return; 
            }

            // Atualiza o saldo: subtrai o valor do PIX.
            const novoSaldoBRL = saldoBRL - valor;
            setSaldo("brl", novoSaldoBRL);

            // Cria e registra a transação no histórico.
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
            
            // Sucesso e volta para a tela principal.
            alert(`PIX de R$ ${valor.toFixed(2)} concluído com sucesso!`);
            window.location.href = "principal.html"; 
        });
    }
});