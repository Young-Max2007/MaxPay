// ===========================
// LÓGICA DE CADASTRO
// ===========================

document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("formCadastro");

    if (formCadastro) {
        formCadastro.addEventListener("submit", function (e) {
            e.preventDefault();

            // Pega os valores pelos nomes dos inputs (conforme seu HTML)
            const nome = formCadastro.elements.namedItem("nome").value.trim();
            const cpf = formCadastro.elements.namedItem("cpf").value.trim();
            const email = formCadastro.elements.namedItem("email").value.trim();
            const senha = formCadastro.elements.namedItem("senha").value.trim();

            if (nome.length < 3 || email.length < 5 || senha.length < 3 || cpf.length !== 11) {
                alert("Por favor, preencha todos os campos corretamente.");
                return;
            }

            // 1. CARREGA USUÁRIOS EXISTENTES
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

            // 2. VERIFICA DUPLICIDADE (por Email)
            if (usuarios.find(u => u.email === email)) {
                alert("Este email já está cadastrado.");
                return;
            }

            // 3. CRIA NOVO USUÁRIO
            const novoUsuario = {
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senha
            };

            // 4. SALVA E ATUALIZA LISTA
            usuarios.push(novoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            
            // 5. MARCA O NOVO USUÁRIO COMO LOGADO
            localStorage.setItem("lastLoggedUser", JSON.stringify(novoUsuario));


            alert(`Cadastro realizado com sucesso, ${nome}! Você será redirecionado.`);
            
            // 6. REDIRECIONA para a action do formulário
            window.location.href = formCadastro.action;
        });
    }
});