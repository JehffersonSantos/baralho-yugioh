const selecionarCard = document.querySelectorAll('.nome_card');
const imagemCard = document.querySelector('.carta_imagem');
const botaoDescricao = document.querySelector('.botao_descricao');

const carta_virada = 'images/image_9.jpg';

const descricao = {
  1: "Um guerreiro esqueleto que surge das trevas.",
  2: "Um dragão lendário com olhos azuis e poder devastador.",
  3: "O mago supremo dominando a magia negra.",
  4: "Um dragão negro que queima tudo em seu caminho.",
  5: "Um dragão meteórico de chamas intensas.",
  6: "Carta mágica usada para realizar fusões poderosas.",
  7: "Um dos três deuses egípcios, domina os céus.",
  8: "Um dragão amaldiçoado que serve aos guerreiros do caos."
};



botaoDescricao.addEventListener('click', (e) => {
  console.log("botão clicado");

  


});

// function trocarCarta(id) {

//     setTimeout(() => {
//         imagemCard.setAttribute('src', `images/image_${id}.jpg`);
//     }, 200);
// };

function trocarCarta(id) { 
    imagemCard.addEventListener('transitionend', () => {
        imagemCard.setAttribute('src', `images/image_${id}.jpg`);
    });
};


function virarCarta() {
  imagemCard.setAttribute('src', carta_virada);
  imagemCard.classList.add("trocando");
  setTimeout(() => {
  imagemCard.classList.remove("trocando");
  }, 400);
  // imagemCard.addEventListener('transitionend', () => {
  //     imagemCard.setAttribute('src', carta_virada);
  // });
};

selecionarCard.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        const button = e.target;

        const id = button.getAttribute('id');

        virarCarta();

        trocarCarta(id);
        
    });
});