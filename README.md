# Baralho Yu-Gi-Oh

Aplicação front-end simples para navegar por um glossário de cartas de Yu-Gi-Oh!. O projeto agora utiliza [Vite](https://vitejs.dev/) para oferecer um fluxo de desenvolvimento rápido com hot reload e build otimizada.

## Requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (recomendado 20+)
- npm 9 ou superior (vem junto com a instalação do Node.js)

> Verifique sua versão com `node -v` e `npm -v`.

## Instalação

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Garanta que a pasta `public/images` contenha as imagens das cartas (já versionadas no repositório).

## Scripts disponíveis

- **Desenvolvimento** – executa o servidor com hot reload:
  ```bash
  npm run dev
  ```
  O Vite exibirá no terminal o endereço (por padrão `http://localhost:5173`). Abra o link no navegador.

- **Build de produção** – gera arquivos otimizados em `dist/`:
  ```bash
  npm run build
  ```

- **Pré-visualização da build** – serve localmente o conteúdo gerado em `dist/`:
  ```bash
  npm run preview
  ```

## Estrutura relevante

- `index.html` – arquivo HTML raiz consumido pelo Vite.
- `src/main.js` – entry point com a lógica do projeto.
- `src/style.css` – estilos globais importados pelo `main.js`.
- `public/images/` – assets estáticos das cartas; servidos diretamente pelo Vite.

## Dicas

- Caso atualize ou adicione imagens, coloque-as em `public/images` e referencie-as com caminho absoluto (`/images/...`) para manter compatibilidade com o Vite.
- Use `npm audit` para revisar eventuais vulnerabilidades apontadas pelo npm.
