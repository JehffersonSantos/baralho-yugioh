import { cartaStore } from './carta';

const usuarios = [];

const makeId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export class Usuario {
  constructor({ nome, vida, cartas = [] }) {
    this.id = makeId('usr');
    this.nome = nome;
    this.vida = Number(vida);
    this.cartas = [...cartas];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  definirCartas(ids) {
    this.cartas = [...ids];
    this.tocar();
  }

  tocar() {
    this.updatedAt = new Date();
  }
}

export const usuarioStore = {
  criar(dados) {
    const usuario = new Usuario(dados);
    usuarios.push(usuario);
    return usuario;
  },

  listar() {
    return [...usuarios];
  },

  buscarPorId(id) {
    return usuarios.find((usuario) => usuario.id === id) ?? null;
  },

  obterCartasDoUsuario(usuario) {
    return usuario.cartas
      .map((id) => cartaStore.buscarPorId(id))
      .filter(Boolean);
  },
};
