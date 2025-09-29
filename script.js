const selecionarCard = document.querySelectorAll('.nome_card');
const imagemCard = document.querySelector('.image');

selecionarCard.forEach((btn) => {
    btn.addEventListener('click', (e) => {


        const button = e.target;

        const id = button.getAttribute('id');

        imagemCard.classList.add("changing");
        imagemCard.setAttribute('src', `images/image_${id}.jpg`);
    
    });
});