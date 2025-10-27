const selecionarCard = document.querySelectorAll('.nome_card');
const imagemCard = document.querySelector('.image');

const cartaCosta = 'images/image_9.jpg';

// const setaEsquerda = document.querySelector('.seta_esquerda');
// const setaDireita = document.querySelector('.seta_direita');

const setas = document.querySelectorAll('.setas');

const descriptions = {
  '1': 'Um monstro zumbi de Nível 1 com estatísticas modestas (2500 ATK / 12000 DEF). Apesar de parecer fraco, é o núcleo de vários decks temáticos centrados em “Rei Caveira” e suas evoluções, como o poderoso Rei Caveira dos Servos. Seu verdadeiro valor está em combos e suporte a zumbis.',
  '2': 'O lendário Dragão Branco de Olhos Azuis de Seto Kaiba. Nível 8, 3000 ATK e 2500 DEF. Ícone de poder bruto, base para fusões e evoluções como o Dragão Definitivo de Olhos Azuis.',
  '3': 'O mago mais famoso e assinatura de Yugi Muto. 2500 ATK e 2100 DEF, símbolo de poder e sabedoria mística. Centro de vários suportes e fusões como Mago Negro do Caos e Menina Maga Negra.',
  '4': 'Dragão Negro de Olhos Vermelhos: Nível 7, 2400 ATK e 2000 DEF. Carta icônica de Joey Wheeler, com várias evoluções (Darkness, Slash). Representa potencial que cresce com esforço.',
  '5': 'Meteor B. Dragon: fusão entre Red-Eyes Black Dragon e Meteor Dragon. 3500 ATK e 2000 DEF. Visual flamejante e ataque devastador, um clássico imponente dos primeiros animes/jogos.',
  '6': 'Fusão : mágica clássica que une monstros para invocar fusões do Extra Deck. Essencial em estratégias baseadas em fusão; símbolo azul com duas criaturas se unindo.',
  '7': 'Slifer, o Dragão do Céu: carta divina egípcia. Ganha 1000 ATK/DEF por carta na mão do duelista e reduz o ATK de monstros inimigos invocados, podendo destruí-los. Majestoso e temível.',
  '8': 'Maldição do Dragão: dragão alado envolto em trevas, usado por Yugi no início. 2000 ATK e 1500 DEF. Comumente fundido com Gaia, o Cavaleiro Implacável, formando Gaia, o Cavaleiro do Dragão.'
};


console.log(setas);
console.log(selecionarCard);


console.log(imagemCard);
console.log();

setas.forEach((seta) => {
    seta.addEventListener('click', (e) => {
        const direcao = e.currentTarget.getAttribute("id");

        console.log(direcao);

        console.log(imagemCard.getAttribute('src'));
        let idAtual = parseInt(imagemCard.getAttribute('src').split('_')[1].split('.')[0]);
        console.log(idAtual);

        // let novoId;
        console.log(typeof(idAtual))
        // console.log(idAtual-1);

        let novoId = direcao === "seta_esquerda" ? idAtual - 1 : idAtual + 1;
        if (novoId <= 0 || novoId > 8) {
            return;
        }

        console.log(novoId);

      //   if (direcao === 'seta_esquerda') {

      //     novoId = idAtual - 1;
      //     console.log(novoId);
      //   } else if (direcao === 'seta_direita') {

      //     novoId = idAtual + 1;
      //     console.log(novoId);
        

      // };

      trocarCarta(novoId);
    })
});



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
  imagemCard.setAttribute('src', cartaCosta);
  imagemCard.classList.add("trocando");
  await esperarAnimacao(imagemCard);
  imagemCard.setAttribute('src', `images/image_${id}.jpg`);
  imagemCard.classList.remove("trocando");

};

selecionarCard.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = e.currentTarget.getAttribute("id");
    
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