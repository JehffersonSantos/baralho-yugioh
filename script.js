const cardButtons = document.querySelectorAll('.nome_card');
const cardImage = document.querySelector('.image');
const cardDescription = document.querySelector('#card-description');
const descriptionToggleBtn = document.querySelector('#toggle-description');
const mobileQuery = window.matchMedia('(max-width: 780px)');
const prevBtn = document.querySelector('#prev-card');
const nextBtn = document.querySelector('#next-card');

const CARD_BACK_SRC = 'images/image_9.jpg';
const LIFT_DISTANCE_PX = 35;

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

const preloadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });

const waitForTransformEnd = (element) => {
  const fallbackDelay = 50;
  const computedStyle = window.getComputedStyle(element);
  const durations = computedStyle.transitionDuration.split(',');
  const delays = computedStyle.transitionDelay.split(',');

  const longestDuration = durations.reduce((max, rawDuration, index) => {
    const durationSeconds = parseFloat(rawDuration) || 0;
    const delaySeconds = parseFloat(delays[index] || delays[0]) || 0;
    return Math.max(max, (durationSeconds + delaySeconds) * 1000);
  }, 0);

  return new Promise((resolve) => {
    let completed = false;

    const finish = () => {
      if (completed) {
        return;
      }
      completed = true;
      element.removeEventListener('transitionend', handleTransitionEnd);
      resolve();
    };

    const handleTransitionEnd = (event) => {
      if (event.propertyName === 'transform') {
        finish();
      }
    };

    if (longestDuration === 0) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(finish);
      });
      return;
    }

    element.addEventListener('transitionend', handleTransitionEnd);

    window.setTimeout(finish, longestDuration + fallbackDelay);
  });
};

const frontTransform = 'rotateY(0deg) translateY(0)';
const liftMidTransform = `rotateY(90deg) translateY(-${LIFT_DISTANCE_PX}px)`;

let isFlipping = false;
let currentId = null;

// Controla visibilidade da descrição em mobile/desktop
const setDescriptionExpanded = (expanded) => {
  if (!cardDescription || !descriptionToggleBtn) return;
  descriptionToggleBtn.setAttribute('aria-expanded', String(expanded));
  if (expanded) {
    cardDescription.classList.add('is-visible');
    descriptionToggleBtn.textContent = 'Esconder descrição';
  } else {
    cardDescription.classList.remove('is-visible');
    descriptionToggleBtn.textContent = 'Mostrar descrição';
  }
};

const applyResponsiveDescriptionState = () => {
  if (!cardDescription) return;
  if (mobileQuery.matches) {
    // Em mobile, fica oculto por padrão (só aparece com o botão)
    setDescriptionExpanded(false);
  } else {
    // Em desktop, mostramos sem depender do botão
    if (descriptionToggleBtn) descriptionToggleBtn.setAttribute('aria-expanded', 'false');
    cardDescription.classList.remove('is-visible');
  }
};

if (descriptionToggleBtn) {
  descriptionToggleBtn.addEventListener('click', () => {
    const expanded = descriptionToggleBtn.getAttribute('aria-expanded') === 'true';
    setDescriptionExpanded(!expanded);
  });
}

applyResponsiveDescriptionState();
mobileQuery.addEventListener('change', applyResponsiveDescriptionState);

const flipTo = async (id) => {
  if (isFlipping) return;
  isFlipping = true;

  const selectedCardSrc = `images/image_${id}.jpg`;

  try {
    cardImage.setAttribute('src', CARD_BACK_SRC);
    cardImage.style.transform = frontTransform;
    // primeira metade: levemente mais rápida na ida, com easing suave
    cardImage.style.transition = 'transform 0.35s cubic-bezier(.30,.70,.40,1)';
    void cardImage.offsetWidth;

    const firstHalfTransition = waitForTransformEnd(cardImage);
    cardImage.style.transform = liftMidTransform;

    await Promise.all([firstHalfTransition, preloadImage(selectedCardSrc)]);

    cardImage.setAttribute('src', selectedCardSrc);
    if (cardDescription) {
      cardDescription.textContent = descriptions[id] || '';
    }
    // segunda metade: um pouco mais longa, easing mais confortável no retorno
    cardImage.style.transition = 'transform 0.45s cubic-bezier(.22,.61,.36,1)';
    void cardImage.offsetWidth;

    const secondHalfTransition = waitForTransformEnd(cardImage);
    cardImage.style.transform = frontTransform;

    await secondHalfTransition;
    currentId = parseInt(id, 10);
  } catch (error) {
    console.error(`Erro ao carregar a imagem ${selectedCardSrc}`, error);
    cardImage.style.transform = frontTransform;
  } finally {
    // limpa transição inline para respeitar o CSS padrão nas próximas interações
    cardImage.style.transition = '';
    isFlipping = false;
  }
};

cardButtons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    const { id } = event.currentTarget;
    await flipTo(id);
  });
});

const nextId = (id) => (id ? ((id % 8) + 1) : 1);
const prevId = (id) => (id ? (((id + 6) % 8) + 1) : 8);

if (nextBtn) {
  nextBtn.addEventListener('click', async () => {
    const id = nextId(currentId);
    await flipTo(id);
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', async () => {
    const id = prevId(currentId);
    await flipTo(id);
  });
}
