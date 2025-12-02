document.addEventListener("DOMContentLoaded", function () {
    const historicoLista = document.getElementById("historicoLista");

    function renderizarHistorico() {
        const historico = getHistorico();
        
        if (historico.length === 0) {
            historicoLista.innerHTML = '<p style="color: gray; margin-top: 20px;">Nenhuma transação registrada ainda.</p>';
            return;
        }

        // Limpa o conteúdo
        historicoLista.innerHTML = ''; 

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
            historicoLista.innerHTML += itemHTML;
        });
    }

    renderizarHistorico();
});