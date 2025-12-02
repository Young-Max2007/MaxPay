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

    const email = formLogin.email.value.trim();
    const senha = formLogin.senha.value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (!user) {
      alert("Email ou senha incorretos!");
      return;
    }

    alert(`Bem-vindo(a), ${user.nome}!`);
    window.location.href = "principal.html";
  });
}

// =======================================================
// SALDO NO PAINEL PRINCIPAL (MODIFICADO PARA APENAS BRL)
// =======================================================

function atualizarSaldoPrincipal() {
  const saldoEl = document.getElementById("saldoPrincipal");

  if (saldoEl) {
    // ⚠️ AGORA EXIBE APENAS O SALDO INDIVIDUAL EM BRL
    const saldoBRL = getSaldo("brl"); 
    
    // O h3 com ID 'saldoPrincipal' será atualizado com o valor em Real.
    saldoEl.innerText = "R$ " + saldoBRL.toFixed(2);
  }
}

// 1. Atualiza quando a página é carregada
document.addEventListener("DOMContentLoaded", atualizarSaldoPrincipal);

// 2. Atualiza quando a página é mostrada (necessário para sincronização)
window.addEventListener('pageshow', atualizarSaldoPrincipal);