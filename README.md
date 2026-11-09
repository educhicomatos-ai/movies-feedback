# Jogos & Avaliações

Aplicação React para explorar jogos gratuitos, montar uma lista pessoal e avaliar os jogos com estrelas.

## Como executar

1. Abra a pasta do projeto no VS Code.
2. No terminal, execute `npm install`.
3. Execute `npm run dev` e abra o endereço mostrado no terminal.

## Como usar

- O catálogo carrega jogos e imagens da FreeToGame.
- Pesquise pelo nome e use o botão para adicionar um jogo à sua lista.
- Em “Minha lista”, também é possível cadastrar um jogo, editar nome e gênero, avaliar de uma a cinco estrelas ou remover um jogo.
- A lista e as notas são guardadas no `localStorage` do navegador.

## O que o projeto demonstra

- Rotas para catálogo, lista pessoal, sobre e página não encontrada.
- Componentes React que recebem informações e ações por props.
- Listas de objetos renderizadas com `map` e uma `key` por jogo.
- Formulários controlados para pesquisa, cadastro e edição.
- Operações de cadastro, listagem, edição e remoção, com persistência no `localStorage`.
- Estilos específicos por componente e página usando CSS Modules.

## Como a API funciona

O catálogo usa `fetch` para consultar `https://www.freetogame.com/api/games?platform=pc`. A API é pública e não precisa de uma chave.
