// Script para listar e mostrar todas as transações na página de histórico.
document.addEventListener("DOMContentLoaded", function () {
    const historicoLista = document.getElementById("historicoLista");

    // Função que busca os dados e monta a lista visual.
    function renderizarHistorico() {
        // Pega o array completo de transações do LocalStorage (via getHistorico).
        const historico = getHistorico();
        
        // Se o histórico estiver vazio, exibe uma mensagem.
        if (historico.length === 0) {
            historicoLista.innerHTML = '<p style="color: gray; margin-top: 20px;">Nenhuma transação registrada ainda.</p>';
            return;
        }

        // Limpa a lista antes de reconstruir.
        historicoLista.innerHTML = ''; 

        // Roda um loop para cada transação e cria o HTML correspondente.
        historico.forEach(transacao => {
            const itemHTML = `
                <div class="menu-btn btn-neon historico-item">
                    <h3 class="titulo-com-icone">
                        ${transacao.moedaDe} → ${transacao.moedaPara}
                    </h3>
                    <p>
                        **${transacao.valor} ${transacao.moedaDe}** <span style="opacity: 0.6;">convertido para</span> 
                        **${transacao.resultado} ${transacao.moedaPara}**
                    </p>
                    <small style="color: #00ffcc; font-size: 0.8rem; margin-top: 5px;">
                        ${transacao.data} às ${transacao.hora}
                    </small>
                </div>
            `;
            // Insere o novo item na lista.
            historicoLista.innerHTML += itemHTML;
        });
    }

    // Inicia a renderização.
    renderizarHistorico();
});