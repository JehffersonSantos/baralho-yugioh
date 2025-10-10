const selecionarCard = document.querySelectorAll('.nome_card');
const imagemCard = document.querySelector('.image');

const criarCard = document.createElement('img');

function esperarAnimacao(elemento) {
    return new Promise((resolve) => {
        const handle = () => {
            elemento.removeEventListener('transitionend', handle);
            resolve();
        }
        elemento.addEventListener('transitionend', handle);
    },);
};

async function trocarCarta(id) {
    imagemCard.classList.add("trocando");
    await esperarAnimacao(imagemCard);
    imagemCard.setAttribute('src', `images/image_${id}.jpg`);
    imagemCard.classList.remove("trocando");

};

selecionarCard.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = e.target.getAttribute("id");
    trocarCarta(id); 
  });
});

// selecionarCard.forEach((btn) => {
//     btn.addEventListener('click', (e) => {


//         const button = e.target;

//         const id = button.getAttribute('id');

//         imagemCard.classList.add("trocando");
//         setTimeout(() => {
//             imagemCard.classList.remove("trocando");
//         }, 400);

//         imagemCard.setAttribute('src', `images/image_${id}.jpg`);
    
//     });
// });