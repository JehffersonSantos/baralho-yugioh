const selecionarCard = document.querySelectorAll('.nome_card');
const imagemCard = document.querySelector('.image');
const carta_virada = 'images/image_9.jpg';




function trocarCarta(id) {

    setTimeout(() => {
        imagemCard.setAttribute('src', `images/image_${id}.jpg`);
    }, 200);
}

function virarCarta() {

        imagemCard.classList.add("trocando");
        setTimeout(() => {
        imagemCard.classList.remove("trocando");
        }, 400);
}

selecionarCard.forEach((btn) => {
    btn.addEventListener('click', (e) => {


        const button = e.target;

        const id = button.getAttribute('id');

        virarCarta();

        trocarCarta(id);
        
    });
});