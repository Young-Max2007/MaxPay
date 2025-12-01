// ===========================
// MENU LATERAL
// ===========================
const menu = document.querySelector('.menu');
const lateral = document.querySelector('.lateral');

if (menu && lateral) {
    // abrir/fechar ao clicar no hambúrguer
    menu.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active'); 
        lateral.classList.toggle('active'); 
    });

    // fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
        if(lateral.classList.contains('active') && !lateral.contains(e.target) && e.target !== menu){
            lateral.classList.remove('active');
            menu.classList.remove('active');
        }
    });
}

// Fade-in da página
window.addEventListener('load', () => {
    const pag = document.getElementById('pag');
    if (pag) pag.classList.add('visible'); 
});

// ===========================
// VALIDAÇÃO DE FORMULÁRIOS
// ===========================
const formCadastro = document.querySelector('form[action="principal.html"]');
if(formCadastro) {
    formCadastro.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const nome = formCadastro.elements['nome'] ? formCadastro.elements['nome'].value.trim() : '';
        const cpf = formCadastro.elements['cpf'] ? formCadastro.elements['cpf'].value.trim() : '';
        const email = formCadastro.elements['email'] ? formCadastro.elements['email'].value.trim() : '';
        const senha = formCadastro.elements['senha'] ? formCadastro.elements['senha'].value.trim() : '';

        // Validações
        if(nome.length < 2){
            alert("Informe um nome válido!");
            return;
        }

        if(!/^\d{11}$/.test(cpf)){
            alert("CPF inválido! Deve ter 11 dígitos numéricos.");
            return;
        }

        if(!/^\S+@\S+\.\S+$/.test(email)){
            alert("Email inválido!");
            return;
        }

        if(senha.length < 6){
            alert("Senha deve ter no mínimo 6 caracteres!");
            return;
        }

        // Salva cadastro no localStorage (simulando banco)
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        if(usuarios.some(function(u) { return u.email === email; })){
            alert("Email já cadastrado!");
            return;
        }
        usuarios.push({nome: nome, cpf: cpf, email: email, senha: senha});
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "principal.html";
    });
}

// ===========================
// LOGIN (entrar.html)
// ===========================
const formLogin = document.querySelector('form[action="principal.html"]:not([id=formCadastro])');
if(formLogin){
    formLogin.addEventListener('submit', function(e){
        e.preventDefault();

        const email = formLogin.elements['email'] ? formLogin.elements['email'].value.trim() : '';
        const senha = formLogin.elements['senha'] ? formLogin.elements['senha'].value.trim() : '';

        if(!/^\S+@\S+\.\S+$/.test(email)){
            alert("Email inválido!");
            return;
        }

        if(senha.length < 6){
            alert("Senha inválida!");
            return;
        }

        // Verifica usuários cadastrados
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const user = usuarios.find(function(u){ return u.email === email && u.senha === senha; });

        if(!user){
            alert("Email ou senha incorretos!");
            return;
        }

        alert("Bem-vindo(a), " + user.nome + "!");
        window.location.href = "principal.html";
    });
}

// ===========================
// SALDO PRINCIPAL
// ===========================
document.addEventListener("DOMContentLoaded", function () {
    const saldoEl = document.getElementById("saldoPrincipal");
    if (!saldoEl) return;

    // SALDOS INICIAIS
    if (!localStorage.getItem("brl")) localStorage.setItem("brl", "2500.50"); 
    if (!localStorage.getItem("usd")) localStorage.setItem("usd", "0");
    if (!localStorage.getItem("eur")) localStorage.setItem("eur", "0");

    // Pega os saldos do localStorage
    var saldoBRL = parseFloat(localStorage.getItem("brl") || "0");
    var saldoUSD = parseFloat(localStorage.getItem("usd") || "0");
    var saldoEUR = parseFloat(localStorage.getItem("eur") || "0");

    // Converte USD e EUR pra BRL
    var totalBRL = saldoBRL + saldoUSD * 5.0 + saldoEUR * 5.4;

    saldoEl.innerText = "R$ " + totalBRL.toFixed(2);
});