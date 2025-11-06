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

## SPA e funcionalidades

A aplicação roda totalmente no navegador usando armazenamento em memória — ideal para GitHub Pages.

### Cadastro de cartas
- Formulário em **Cadastrar cartas** guarda as cartas com IDs baseados em timestamp.
- A tabela resultante é interativa: clique em qualquer carta para abrir um modal com nome, atributos, datas e a imagem vinda da URL cadastrada.

### Cadastro de jogadores
- Cada jogador recebe ID único, pontos de vida, datas de criação/atualização e a lista de cartas associadas.
- Ao selecionar cartas, abre-se um modal com thumbnails (até ~200 px) e badge “Selecionada”; o contador ao rodapé mostra quantas cartas estão ativas.
- O painel “Cartas escolhidas” exibe miniaturas com o nome abaixo para rápida conferência.
- No listing de jogadores aparece apenas a contagem de cartas; clicar na linha abre um modal com os dados completos e cards em formato de galeria.

### Partidas
- Defina desafiante/desafiado a partir dos jogadores cadastrados.
- Cada partida armazena horários de criação/início, e pode ser finalizada seleccionando o vencedor diretamente na tabela.

### Modais e usabilidade
- Todos os modais podem ser fechados pelos botões, clicando fora ou apertando `Esc`.
- Ao fechar o modal de seleção de cartas sem confirmar, o estado volta ao conjunto previamente salvo.

## Estrutura relevante

- `index.html` – arquivo HTML raiz consumido pelo Vite.
- `src/main.js` – entry point com a lógica do projeto.
- `src/style.css` – estilos globais importados pelo `main.js`.
- `public/images/` – assets estáticos das cartas; servidos diretamente pelo Vite.

## Dicas

- Caso atualize ou adicione imagens, coloque-as em `public/images` e referencie-as com caminho absoluto (`/images/...`) para manter compatibilidade com o Vite.
- Use `npm audit` para revisar eventuais vulnerabilidades apontadas pelo npm.
