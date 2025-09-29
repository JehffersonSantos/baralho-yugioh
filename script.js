const selecionarCard = document.querySelectorAll('.nome_card');
const imagemCard = document.querySelector('.image');

const criarCard = document.createElement('img');

selecionarCard.forEach((btn) => {
    btn.addEventListener('click', (e) => {


        const button = e.target;

        const id = button.getAttribute('id');

        imagemCard.classList.add("trocando");
        imagemCard.classList.toggle("trocando");
        imagemCard.setAttribute('src', `images/image_${id}.jpg`);
    
    });
});