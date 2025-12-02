document.addEventListener("DOMContentLoaded", function () {

    const nomeUsuarioEl = document.getElementById("nomeUsuario");
    const emailUsuarioEl = document.getElementById("emailUsuario");

    // Tenta obter o usuário logado do localStorage
    // Assumimos que o scripts.js ou login armazena o último usuário logado,
    // ou que o 'scripts.js' global pode ter a função getLoggedUser()
    function getLoggedUser() {
        // Esta função deve ser robusta para encontrar o usuário
        // No seu código de login, você pode salvar o objeto do usuário completo ou apenas o ID/Email.
        // Vamos usar um placeholder baseado no último login:
        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        
        // Simulação: Pegar o primeiro usuário cadastrado para fins de demonstração
        if (usuarios.length > 0) {
            return usuarios[0]; 
        }
        
        // Valor padrão se não houver usuários
        return { nome: "Usuário MaxPay", email: "maxpay@contato.com" };
    }

    const usuario = getLoggedUser();

    if (nomeUsuarioEl) {
        nomeUsuarioEl.textContent = usuario.nome;
    }
    if (emailUsuarioEl) {
        emailUsuarioEl.textContent = usuario.email;
    }
});