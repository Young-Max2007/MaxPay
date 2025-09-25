const menu = document.getElementById('menu');
const lateral = document.getElementById('lateral');

menu.addEventListener('click', () => {
    menu.classList.toggle('active'); // animação do X
    lateral.classList.toggle('active'); // abre/fecha menu lateral
});


window.addEventListener('load', () => {
    const pag = document.getElementById('pag');
    pag.classList.add('visible'); // adiciona a classe que faz o fade
});