const cardButtons = document.querySelectorAll('.nome_card');
const cardImage = document.querySelector('.image');

const CARD_BACK_SRC = 'images/image_9.jpg';
const LIFT_DISTANCE_PX = 35;

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

cardButtons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    if (isFlipping) {
      return;
    }

    isFlipping = true;

    const { id } = event.currentTarget;
    const selectedCardSrc = `images/image_${id}.jpg`;

    try {
      cardImage.setAttribute('src', CARD_BACK_SRC);
      cardImage.style.transform = frontTransform;
      void cardImage.offsetWidth;

      const firstHalfTransition = waitForTransformEnd(cardImage);
      cardImage.style.transform = liftMidTransform;

      await Promise.all([firstHalfTransition, preloadImage(selectedCardSrc)]);

      cardImage.setAttribute('src', selectedCardSrc);
      void cardImage.offsetWidth;

      const secondHalfTransition = waitForTransformEnd(cardImage);
      cardImage.style.transform = frontTransform;

      await secondHalfTransition;
    } catch (error) {
      console.error(`Erro ao carregar a imagem ${selectedCardSrc}`, error);
      cardImage.style.transform = frontTransform;
    } finally {
      isFlipping = false;
    }
  });
});
