import './style.css';

const selecionarCard = document.querySelectorAll('.nome_card');
const imagemCard = document.querySelector('.carta_imagem');
const botaoDescricao = document.querySelector('.botao_descricao');
const descricaoCarta = document.querySelector('.descricao_carta');
const seta = document.querySelectorAll('.setas');
const descricao_carta = document.querySelector('.descricao_carta')

const carta_virada = '/images/image_9.jpg';

const descricao = {
  1: "Um guerreiro esqueleto que surge das trevas.",
  2: "Um dragão lendário com olhos azuis e poder devastador.",
  3: "O mago supremo dominando a magia negra.",
  4: "Um dragão negro que queima tudo em seu caminho.",
  5: "Um dragão meteórico de chamas intensas.",
  6: "Carta mágica usada para realizar fusões poderosas.",
  7: "Um dos três deuses egípcios, domina os céus.",
  8: "Um dragão amaldiçoado que serve aos guerreiros do caos.",
  9: " Parte de tras das cartas do Yu gi oh"
};



botaoDescricao.addEventListener('click', (e) => {
  console.log("botão clicado");

  const ativo = botaoDescricao.classList.toggle('ativo');
  console.log(ativo)
  
  descricaoCarta.style.display = ativo ? 'block' : 'none';
  console.log(descricaoCarta)
  botaoDescricao.textContent = ativo ? 'Esconder Descrição' : 'Mostrar Descrição';

});

console.log(descricao[1])


seta.forEach((seta) => {
    seta.addEventListener('click', (e) => {
    
    const setaEscolhida = e.target.getAttribute('id');

    let separar = imagemCard.getAttribute("src");
    let cartaAtual = parseInt(separar.split("image_")[1]);

    console.log(setaEscolhida);
    console.log(separar);
    console.log(cartaAtual);


    if(setaEscolhida === "esquerda"){
      cartaAtual = cartaAtual > 1 ? cartaAtual - 1 : 8;
    }else if (setaEscolhida === "direita")
    {
      cartaAtual = cartaAtual < 8 ? cartaAtual + 1 : 1;
    }

    console.log(cartaAtual)

    virarCarta()
    // imagemCard.setAttribute('src', `/images/image_${cartaAtual}.jpg`)
    atualizarDescricao(cartaAtual)
    trocarCarta(cartaAtual)
  });
});

// function trocarCarta(id) {

//     setTimeout(() => {
//         imagemCard.setAttribute('src', `images/image_${id}.jpg`);
//     }, 200);
// };

function atualizarDescricao (cartaAtual) {
  document.getElementById('descricao_carta').innerText = descricao[cartaAtual]
}

function trocarCarta(id) { 
    imagemCard.addEventListener('transitionend', () => {
        imagemCard.setAttribute('src', `/images/image_${id}.jpg`);
    },  { once: true });
    atualizarDescricao(id);
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
