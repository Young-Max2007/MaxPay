// ===========================
// MENU LATERAL
// ===========================
const menu = document.querySelector('.menu');
const lateral = document.querySelector('.lateral');

if (menu && lateral) {
  menu.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
    lateral.classList.toggle('active');
  });

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

// ===========================
// FADE-IN
// ===========================
window.addEventListener('load', () => {
  const pag = document.getElementById('pag');
  if (pag) pag.classList.add('visible');
});

// ===========================
// LOGIN
// ===========================
const formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    // No seu HTML de login, os inputs não têm ID, então usamos o atributo name (se for index.html)
    // Se o formLogin for o HTML que você enviou, ele precisa de inputs com name="email" e name="senha"
    const email = formLogin.elements.namedItem("email").value.trim();
    const senha = formLogin.elements.namedItem("senha").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (!user) {
      alert("Email ou senha incorretos!");
      return;
    }

    // NOVA LINHA: Salva o usuário logado para a mensagem de boas-vindas
    localStorage.setItem("lastLoggedUser", JSON.stringify(user));

    alert(`Bem-vindo(a), ${user.nome}!`);
    window.location.href = "principal.html";
  });
}

// =======================================================
// SALDO NO PAINEL PRINCIPAL (MODIFICADO PARA APENAS BRL)
// =======================================================

function atualizarSaldoPrincipal() {
  const saldoEl = document.getElementById("saldoPrincipal");

  if (saldoEl && typeof getSaldo === 'function') {
    // ⚠️ AGORA EXIBE APENAS O SALDO INDIVIDUAL EM BRL
    const saldoBRL = getSaldo("brl"); 
    
    // O h3 com ID 'saldoPrincipal' será atualizado com o valor em Real.
    saldoEl.innerText = "R$ " + saldoBRL.toFixed(2).replace('.', ',');
  }
}

// ===========================
// SAUDAÇÃO NA TELA PRINCIPAL (FUNÇÃO NOVA)
// ===========================

function exibirBoasVindas() {
    const bemVindoEl = document.getElementById("bemVindoMsg");
    
    if (bemVindoEl) {
        // Tenta buscar o último usuário logado/cadastrado
        const userJson = localStorage.getItem("lastLoggedUser");
        
        if (userJson) {
            const user = JSON.parse(userJson);
            // Captura apenas o primeiro nome para uma saudação rápida
            const primeiroNome = user.nome.split(' ')[0]; 
            
            bemVindoEl.innerText = `Bem-vindo(a), ${primeiroNome}!`;
        } else {
             // Caso não ache, exibe uma saudação genérica
             bemVindoEl.innerText = `Bem-vindo(a) ao MaxPay!`;
        }
    }
}


// CHAMADAS GERAIS AO CARREGAR A PÁGINA

document.addEventListener("DOMContentLoaded", function() {
    // 1. Atualiza Saldo
    atualizarSaldoPrincipal();
    
    // 2. Exibe Boas-vindas (se estiver na página principal)
    if (document.querySelector('title').textContent.includes('Painel Principal')) {
        exibirBoasVindas();
    }
});

// 3. Atualiza quando a página é mostrada (para sincronização de saldos)
window.addEventListener('pageshow', atualizarSaldoPrincipal);