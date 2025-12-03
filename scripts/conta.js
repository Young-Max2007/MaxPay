// Script para carregar e exibir os dados do usuário na tela de conta.
document.addEventListener("DOMContentLoaded", function () {

    const nomeUsuarioEl = document.getElementById("nomeUsuario");
    const emailUsuarioEl = document.getElementById("emailUsuario");

    // Função que busca os dados do último usuário logado no LocalStorage.
    function getLoggedUser() {
        const userJson = localStorage.getItem("lastLoggedUser");

        if (userJson) {
            return JSON.parse(userJson);
        }
        
        // Retorna um texto de placeholder caso não encontre o usuário logado.
        return { nome: "Usuário MaxPay", email: "maxpay@contato.com" };
    }

    const usuario = getLoggedUser();

    // Atualiza os campos na tela com as informações do usuário.
    if (nomeUsuarioEl) {
        nomeUsuarioEl.textContent = usuario.nome;
    }
    if (emailUsuarioEl) {
        emailUsuarioEl.textContent = usuario.email;
    }
});