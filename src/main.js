import './style.css';
import { cartaStore } from './carta';
import { usuarioStore } from './usuario';
import { partidaStore } from './partida';

const navLinks = document.querySelectorAll('[data-nav]');
const views = document.querySelectorAll('[data-view]');
const cardForm = document.getElementById('cardForm');
const cardTableBody = document.getElementById('cardTableBody');
const playerForm = document.getElementById('playerForm');
const playerTableBody = document.getElementById('playerTableBody');
const matchForm = document.getElementById('matchForm');
const matchTableBody = document.getElementById('matchTableBody');
const cardSelectionModal = document.getElementById('cardModal');
const modalList = document.getElementById('modalCardList');
const openModalBtn = document.getElementById('openCardModal');
const closeModalBtn = document.getElementById('closeCardModal');
const cancelModalBtn = document.getElementById('cancelCardSelection');
const confirmModalBtn = document.getElementById('confirmCardSelection');
const selectedCardsDisplay = document.getElementById('selectedCardsDisplay');
const selectionCountLabel = document.getElementById('modalSelectionCount');
const desafianteSelect = matchForm?.elements.namedItem('desafiante');
const desafiadoSelect = matchForm?.elements.namedItem('desafiado');

const playerModal = document.getElementById('playerDetailModal');
const closePlayerModalBtn = document.getElementById('closePlayerModal');
const playerModalCloseButton = document.getElementById('playerModalCloseButton');
const playerModalName = document.getElementById('playerModalName');
const playerModalLife = document.getElementById('playerModalLife');
const playerModalCreated = document.getElementById('playerModalCreated');
const playerModalUpdated = document.getElementById('playerModalUpdated');
const playerModalCards = document.getElementById('playerModalCards');

const cardDetailModal = document.getElementById('cardDetailModal');
const closeCardDetailModalBtn = document.getElementById('closeCardDetailModal');
const cardDetailCloseButton = document.getElementById('cardDetailCloseButton');
const cardModalName = document.getElementById('cardModalName');
const cardModalAttack = document.getElementById('cardModalAttack');
const cardModalDefense = document.getElementById('cardModalDefense');
const cardModalCreated = document.getElementById('cardModalCreated');
const cardModalUpdated = document.getElementById('cardModalUpdated');
const cardModalImage = document.getElementById('cardModalImage');

let selectedCardIds = [];
let modalSelection = new Set();

const formatDateTime = (date) => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(date);
};

const showModal = (element) => {
  if (!element) return;
  element.classList.remove('hidden');
  element.setAttribute('aria-hidden', 'false');
};

const hideModal = (element) => {
  if (!element) return;
  element.classList.add('hidden');
  element.setAttribute('aria-hidden', 'true');
};

const pluralize = (total, singular, plural) => {
  const value = Number(total) || 0;
  return value === 1 ? `1 ${singular}` : `${value} ${plural}`;
};

const switchView = (target) => {
  views.forEach((view) => {
    view.classList.toggle('active', view.dataset.view === target);
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.nav === target);
  });
};

const renderCards = () => {
  const cartas = cartaStore.listar();
  cardTableBody.innerHTML = '';

  if (!cartas.length) {
    cardTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty">Nenhuma carta cadastrada.</td>
      </tr>
    `;
  } else {
    cartas.forEach((carta) => {
      const row = document.createElement('tr');
      row.classList.add('clickable-row');
      row.innerHTML = `
        <td>${carta.nome}</td>
        <td>${carta.forca}</td>
        <td>${carta.defesa}</td>
        <td>${formatDateTime(carta.createdAt)}</td>
        <td>${formatDateTime(carta.updatedAt)}</td>
      `;
      row.addEventListener('click', () => {
        openCardDetailModal(carta);
      });
      cardTableBody.appendChild(row);
    });
  }

  renderCardModal(cartas);
};

const updateModalSelectionCount = () => {
  if (!selectionCountLabel) return;
  const total = modalSelection.size;
  if (!total) {
    selectionCountLabel.textContent = 'Nenhuma carta selecionada';
  } else {
    selectionCountLabel.textContent = `${total} carta${total > 1 ? 's' : ''} selecionada${total > 1 ? 's' : ''}`;
  }
};

const setOptionSelected = (option, isSelected) => {
  option.classList.toggle('selected', isSelected);
  option.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
};

const renderCardModal = (cartas) => {
  modalList.innerHTML = '';
  if (!cartas.length) {
    modalList.innerHTML = '<p class="empty">Cadastre cartas para selecioná-las.</p>';
    updateModalSelectionCount();
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'card-grid';
  cartas.forEach((carta) => {
    const item = document.createElement('div');
    item.className = 'card-option';
    item.dataset.id = carta.id;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.innerHTML = `
      <img src="${carta.imagemUrl}" alt="${carta.nome}">
      <div>
        <strong>${carta.nome}</strong>
        <div class="meta">
          <span>ATK: ${carta.forca}</span>
          <span>DEF: ${carta.defesa}</span>
        </div>
      </div>
    `;
    setOptionSelected(item, modalSelection.has(carta.id));
    grid.appendChild(item);
  });

  modalList.appendChild(grid);
  updateModalSelectionCount();
};

const updateSelectedCardsDisplay = (ids = selectedCardIds) => {
  selectedCardsDisplay.innerHTML = '';
  selectedCardsDisplay.classList.toggle('empty', !ids.length);

  if (!ids.length) {
    selectedCardsDisplay.textContent = 'Nenhuma carta selecionada.';
    return;
  }

  const fragment = document.createDocumentFragment();
  ids
    .map((id) => cartaStore.buscarPorId(id))
    .filter(Boolean)
    .forEach((carta) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'selected-card-thumb';

      const img = document.createElement('img');
      img.src = carta.imagemUrl;
      img.alt = `Carta ${carta.nome}`;

      const span = document.createElement('span');
      span.textContent = carta.nome;

      wrapper.append(img, span);
      fragment.appendChild(wrapper);
    });

  selectedCardsDisplay.appendChild(fragment);
};

const handleModalCardToggle = (event) => {
  const option = event.target.closest('.card-option');
  if (!option) return;

  if (event.type === 'keydown' && !['Enter', ' ', 'Spacebar'].includes(event.key)) {
    return;
  }

  event.preventDefault();

  const id = option.dataset.id;
  if (!id) return;

  const currentlySelected = modalSelection.has(id);
  if (currentlySelected) {
    modalSelection.delete(id);
  } else {
    modalSelection.add(id);
  }

  setOptionSelected(option, !currentlySelected);
  updateModalSelectionCount();
  updateSelectedCardsDisplay(Array.from(modalSelection));
};

modalList?.addEventListener('click', handleModalCardToggle);
modalList?.addEventListener('keydown', handleModalCardToggle);

const updateUserSelects = () => {
  const usuarios = usuarioStore.listar();
  const options = usuarios
    .map((usuario) => `<option value="${usuario.id}">${usuario.nome}</option>`)
    .join('');

  if (desafianteSelect) {
    const value = desafianteSelect.value;
    desafianteSelect.innerHTML = `<option value="">Selecione</option>${options}`;
    if (usuarios.some((usuario) => usuario.id === value)) {
      desafianteSelect.value = value;
    }
  }

  if (desafiadoSelect) {
    const value = desafiadoSelect.value;
    desafiadoSelect.innerHTML = `<option value="">Selecione</option>${options}`;
    if (usuarios.some((usuario) => usuario.id === value)) {
      desafiadoSelect.value = value;
    }
  }
};

const renderPlayers = () => {
  const usuarios = usuarioStore.listar();
  playerTableBody.innerHTML = '';

  if (!usuarios.length) {
    playerTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty">Nenhum jogador cadastrado.</td>
      </tr>
    `;
  } else {
    usuarios.forEach((usuario) => {
      const cartas = usuarioStore.obterCartasDoUsuario(usuario);
      const row = document.createElement('tr');
      row.classList.add('clickable-row');
      row.innerHTML = `
        <td>${usuario.nome}</td>
        <td>${usuario.vida}</td>
        <td class="cards-cell">${pluralize(cartas.length, 'carta', 'cartas')}</td>
        <td>${formatDateTime(usuario.createdAt)}</td>
        <td>${formatDateTime(usuario.updatedAt)}</td>
      `;

      row.addEventListener('click', () => {
        openPlayerDetailModal(usuario);
      });

      playerTableBody.appendChild(row);
    });
  }

  updateUserSelects();
};

const renderMatches = () => {
  const partidas = partidaStore.listar();
  matchTableBody.innerHTML = '';

  if (!partidas.length) {
    matchTableBody.innerHTML = `
      <tr>
        <td colspan="7" class="empty">Nenhuma partida cadastrada.</td>
      </tr>
    `;
    return;
  }

  partidas.forEach((partida) => {
    const desafiante = usuarioStore.buscarPorId(partida.desafianteId);
    const desafiado = usuarioStore.buscarPorId(partida.desafiadoId);
    const vencedor = partida.vencedorId ? usuarioStore.buscarPorId(partida.vencedorId) : null;

    const row = document.createElement('tr');
    const finalizada = Boolean(partida.fim);
    row.innerHTML = `
      <td>${desafiante?.nome ?? '-'}</td>
      <td>${desafiado?.nome ?? '-'}</td>
      <td>${formatDateTime(partida.createdAt)}</td>
      <td>${formatDateTime(partida.inicio)}</td>
      <td>${formatDateTime(partida.fim)}</td>
      <td>${vencedor?.nome ?? '-'}</td>
      <td class="actions"></td>
    `;

    const actionsCell = row.querySelector('.actions');
    if (!finalizada) {
      const winnerSelect = document.createElement('select');
      winnerSelect.innerHTML = `
        <option value="">Selecione vencedor</option>
        <option value="${desafiante?.id ?? ''}">${desafiante?.nome ?? 'Desafiante'}</option>
        <option value="${desafiado?.id ?? ''}">${desafiado?.nome ?? 'Desafiado'}</option>
      `;
      const finishButton = document.createElement('button');
      finishButton.type = 'button';
      finishButton.className = 'primary';
      finishButton.textContent = 'Finalizar';
      finishButton.addEventListener('click', () => {
        const vencedorId = winnerSelect.value;
        if (!vencedorId) {
          alert('Selecione o vencedor para finalizar a partida.');
          return;
        }
        partida.finalizar(vencedorId);
        renderMatches();
      });
      actionsCell.append(winnerSelect, finishButton);
    } else {
      actionsCell.textContent = 'Partida finalizada';
    }

    matchTableBody.appendChild(row);
  });
};

const openCardSelectionModal = () => {
  showModal(cardSelectionModal);
  modalSelection = new Set(selectedCardIds);
  renderCardModal(cartaStore.listar());
  updateSelectedCardsDisplay(Array.from(modalSelection));
};

const closeCardSelectionModal = () => {
  hideModal(cardSelectionModal);
};

const resetModalSelection = () => {
  modalSelection = new Set(selectedCardIds);
  updateModalSelectionCount();
  updateSelectedCardsDisplay();
};

const openPlayerDetailModal = (usuario) => {
  if (!usuario) return;
  playerModalName.textContent = usuario.nome;
  playerModalLife.textContent = usuario.vida;
  playerModalCreated.textContent = formatDateTime(usuario.createdAt);
  playerModalUpdated.textContent = formatDateTime(usuario.updatedAt);

  playerModalCards.innerHTML = '';
  const cartas = usuarioStore.obterCartasDoUsuario(usuario);
  if (!cartas.length) {
    playerModalCards.innerHTML = '<p class="empty">Nenhuma carta vinculada.</p>';
  } else {
    const fragment = document.createDocumentFragment();
    cartas.forEach((carta) => {
      const card = document.createElement('div');
      card.className = 'modal-card';
      const img = document.createElement('img');
      img.src = carta.imagemUrl;
      img.alt = `Carta ${carta.nome}`;
      const caption = document.createElement('span');
      caption.textContent = carta.nome;
      card.append(img, caption);
      fragment.appendChild(card);
    });
    playerModalCards.appendChild(fragment);
  }

  showModal(playerModal);
};

const closePlayerDetailModal = () => {
  hideModal(playerModal);
};

const openCardDetailModal = (carta) => {
  if (!carta) return;
  cardModalName.textContent = carta.nome;
  cardModalAttack.textContent = carta.forca;
  cardModalDefense.textContent = carta.defesa;
  cardModalCreated.textContent = formatDateTime(carta.createdAt);
  cardModalUpdated.textContent = formatDateTime(carta.updatedAt);
  cardModalImage.src = carta.imagemUrl;
  cardModalImage.alt = `Carta ${carta.nome}`;
  showModal(cardDetailModal);
};

const closeCardDetailModal = () => {
  hideModal(cardDetailModal);
  cardModalImage.src = '';
  cardModalImage.alt = 'Visualização da carta';
};

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    switchView(link.dataset.nav);
  });
});

cardForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(cardForm);
  cartaStore.criar({
    nome: data.get('nome'),
    forca: Number(data.get('forca')),
    defesa: Number(data.get('defesa')),
    imagemUrl: data.get('imagemUrl'),
  });
  cardForm.reset();
  renderCards();
});

openModalBtn?.addEventListener('click', () => {
  if (!cartaStore.listar().length) {
    alert('Cadastre cartas antes de selecionar.');
    switchView('cards');
    return;
  }
  openCardSelectionModal();
});

closeModalBtn?.addEventListener('click', () => {
  resetModalSelection();
  closeCardSelectionModal();
});
cancelModalBtn?.addEventListener('click', () => {
  resetModalSelection();
  closeCardSelectionModal();
});

confirmModalBtn?.addEventListener('click', () => {
  selectedCardIds = Array.from(modalSelection);
  updateSelectedCardsDisplay();
  modalSelection = new Set(selectedCardIds);
  updateModalSelectionCount();
  closeCardSelectionModal();
});

closePlayerModalBtn?.addEventListener('click', closePlayerDetailModal);
playerModalCloseButton?.addEventListener('click', closePlayerDetailModal);
playerModal?.addEventListener('click', (event) => {
  if (event.target === playerModal) {
    closePlayerDetailModal();
  }
});

closeCardDetailModalBtn?.addEventListener('click', closeCardDetailModal);
cardDetailCloseButton?.addEventListener('click', closeCardDetailModal);
cardDetailModal?.addEventListener('click', (event) => {
  if (event.target === cardDetailModal) {
    closeCardDetailModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (cardSelectionModal && !cardSelectionModal.classList.contains('hidden')) {
    resetModalSelection();
    closeCardSelectionModal();
  }
  if (playerModal && !playerModal.classList.contains('hidden')) {
    closePlayerDetailModal();
  }
  if (cardDetailModal && !cardDetailModal.classList.contains('hidden')) {
    closeCardDetailModal();
  }
});

playerForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(playerForm);
  if (!selectedCardIds.length) {
    const confirmar = confirm('Nenhuma carta selecionada. Deseja continuar?');
    if (!confirmar) {
      return;
    }
  }
  const usuario = usuarioStore.criar({
    nome: data.get('nome'),
    vida: Number(data.get('vida')),
    cartas: selectedCardIds,
  });
  usuario.definirCartas(selectedCardIds);
  playerForm.reset();
  selectedCardIds = [];
  updateSelectedCardsDisplay();
  renderPlayers();
  switchView('players');
});

matchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(matchForm);
  const desafianteId = data.get('desafiante');
  const desafiadoId = data.get('desafiado');

  if (!desafianteId || !desafiadoId) {
    alert('Selecione os dois jogadores.');
    return;
  }

  if (desafianteId === desafiadoId) {
    alert('O desafiante e o desafiado devem ser jogadores diferentes.');
    return;
  }

  partidaStore.criar({
    desafianteId,
    desafiadoId,
  });

  matchForm.reset();
  renderMatches();
});

updateSelectedCardsDisplay();
renderCards();
renderPlayers();
renderMatches();
