const selecionarCard = document.querySelectorAll('.nome_card');
const imagemCard = document.querySelector('.image');
const carta_virada = 'images/image_9.jpg';


const criarCard = document.createElement('img');

selecionarCard.forEach((btn) => {
    btn.addEventListener('click', (e) => {


        const button = e.target;

        const id = button.getAttribute('id');

        imagemCard.classList.add("trocando");
        setTimeout(() => {
            imagemCard.classList.remove("trocando");
        }, 400);

        imagemCard.setAttribute('src', `images/image_${id}.jpg`);
    
    });
});