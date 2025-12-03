// Este bloco gerencia a submissão do formulário de cadastro.
document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("formCadastro");

    if (formCadastro) {
        formCadastro.addEventListener("submit", function (e) {
            e.preventDefault();

            // Pega os dados que o usuário digitou no formulário.
            const nome = formCadastro.elements.namedItem("nome").value.trim();
            const cpf = formCadastro.elements.namedItem("cpf").value.trim();
            const email = formCadastro.elements.namedItem("email").value.trim();
            const senha = formCadastro.elements.namedItem("senha").value.trim();

            // Validação simples para garantir que os campos estão preenchidos.
            if (nome.length < 3 || email.length < 5 || senha.length < 3 || cpf.length !== 11) {
                alert("Por favor, preencha todos os campos corretamente.");
                return;
            }

            // Carrega todos os usuários já existentes do LocalStorage.
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

            // Verifica se o email que está sendo cadastrado já existe.
            if (usuarios.find(u => u.email === email)) {
                alert("Este email já está cadastrado.");
                return;
            }

            // Cria o objeto com as informações do novo usuário.
            const novoUsuario = {
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senha
            };

            // Salva o novo usuário no array e atualiza o LocalStorage.
            usuarios.push(novoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            
            // Já define o usuário como logado, para ir direto para o painel.
            localStorage.setItem("lastLoggedUser", JSON.stringify(novoUsuario));


            alert(`Cadastro realizado com sucesso, ${nome}! Você será redirecionado.`);
            
            // Redireciona para a tela principal.
            window.location.href = formCadastro.action;
        });
    }
});