// SCRIPT GLOBAL: Contém funções de utilidade e lógica de login/inicialização.
// Básicamete, funções mais simples como a de menou ateeé exibição de alguns valores

// Controles para o Menu Lateral de Navegação.
const menu = document.querySelector('.menu');
const lateral = document.querySelector('.lateral');

if (menu && lateral) {
  // Alterna a classe 'active' para abrir ou fechar o menu.
  menu.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
    lateral.classList.toggle('active');
  });

  // Fecha o menu se o usuário clicar fora dele (melhora a usabilidade).
  document.addEventListener('click', (e) => {
    if (
      lateral.classList.contains('active') &&
      !lateral.contains(e.target) &&
      !menu.contains(e.target)
    ) {
      lateral.classList.remove('active');
      menu.classList.remove('active');
    }
  });
}

// Efeito de transição suave (fade-in) ao carregar a página.
window.addEventListener('load', () => {
  const pag = document.getElementById('pag');
  if (pag) pag.classList.add('visible');
});

// Lógica para o formulário de Login.
const formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = formLogin.email.value.trim();
    const senha = formLogin.senha.value.trim();

    // Busca na lista de usuários cadastrados (do LocalStorage)
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    // Verifica se existe um usuário com o email e senha fornecidos.
    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (!user) {
      alert("Email ou senha incorretos!");
      return;
    }

    // Salva o objeto do usuário logado para uso em outras páginas.
    localStorage.setItem("lastLoggedUser", JSON.stringify(user));

    alert(`Bem-vindo(a), ${user.nome}!`);
    window.location.href = "principal.html";
  });
}

// Atualiza o saldo principal (BRL) na tela inicial.
function atualizarSaldoPrincipal() {
  const saldoEl = document.getElementById("saldoPrincipal");

  if (saldoEl && typeof getSaldo === 'function') {
    const saldoBRL = getSaldo("brl"); 
    saldoEl.innerText = "R$ " + saldoBRL.toFixed(2).replace('.', ',');
  }
}

// Exibe uma saudação personalizada na tela principal.
function exibirBoasVindas() {
    const bemVindoEl = document.getElementById("bemVindoMsg");
    
    if (bemVindoEl) {
        const userJson = localStorage.getItem("lastLoggedUser");
        
        if (userJson) {
            const user = JSON.parse(userJson);
            // Pega só o primeiro nome para deixar a saudação mais amigável.
            const primeiroNome = user.nome.split(' ')[0]; 
            
            bemVindoEl.innerText = `Bem-vindo(a), ${primeiroNome}!`;
        } else {
             bemVindoEl.innerText = `Bem-vindo(a) ao MaxPay!`;
        }
    }
}


// Chamadas de inicialização ao carregar a página.
document.addEventListener("DOMContentLoaded", function() {
    atualizarSaldoPrincipal();
    
    // Roda a saudação apenas na página principal (pelo título).
    if (document.querySelector('title').textContent.includes('Painel Principal')) {
        exibirBoasVindas();
    }
});

// Garante que o saldo atualiza mesmo quando o usuário usa o botão 'voltar' do navegador.
window.addEventListener('pageshow', atualizarSaldoPrincipal);