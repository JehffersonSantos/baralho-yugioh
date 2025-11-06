const cartas = [];

const makeId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export class Carta {
  constructor({ nome, forca, defesa, imagemUrl }) {
    this.id = makeId('card');
    this.nome = nome;
    this.forca = Number(forca);
    this.defesa = Number(defesa);
    this.imagemUrl = imagemUrl;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  atualizarCampos({ nome, forca, defesa, imagemUrl }) {
    if (nome) this.nome = nome;
    if (forca !== undefined) this.forca = Number(forca);
    if (defesa !== undefined) this.defesa = Number(defesa);
    if (imagemUrl) this.imagemUrl = imagemUrl;
    this.updatedAt = new Date();
  }
}

export const cartaStore = {
  criar(dados) {
    const carta = new Carta(dados);
    cartas.push(carta);
    return carta;
  },

  listar() {
    return [...cartas];
  },

  buscarPorId(id) {
    return cartas.find((carta) => carta.id === id) ?? null;
  },
};
