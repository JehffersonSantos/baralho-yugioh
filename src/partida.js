import { usuarioStore } from './usuario';

const partidas = [];

const makeId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export class Partida {
  constructor({ desafianteId, desafiadoId }) {
    this.id = makeId('match');
    this.desafianteId = desafianteId;
    this.desafiadoId = desafiadoId;
    this.createdAt = new Date();
    this.inicio = new Date();
    this.fim = null;
    this.vencedorId = null;
    this.updatedAt = new Date();
  }

  finalizar(vencedorId) {
    if (!vencedorId) return;
    const vencedorExiste = usuarioStore.buscarPorId(vencedorId);
    if (!vencedorExiste) return;
    this.vencedorId = vencedorId;
    this.fim = new Date();
    this.atualizarTimestamp();
  }

  atualizarTimestamp() {
    this.updatedAt = new Date();
  }
}

export const partidaStore = {
  criar(dados) {
    const partida = new Partida(dados);
    partidas.push(partida);
    return partida;
  },

  listar() {
    return [...partidas];
  },

  buscarPorId(id) {
    return partidas.find((partida) => partida.id === id) ?? null;
  },
};
