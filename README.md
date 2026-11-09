# Movies Feedback

Aplicação React para cadastrar e organizar filmes assistidos ou que você deseja assistir.

## Como executar

```bash
npm install
npm run dev
```

## Funcionalidades

- Cadastrar filmes com nome, gênero, ano e status de assistido.
- Listar, pesquisar, editar e excluir filmes.
- Persistir a lista no `localStorage` do navegador.

## Rotas

- `/` e `/filmes` — lista de filmes.
- `/adicionar` — cadastro de filme.
- `/editar/:id` — edição de filme.
- `/sobre` — informações do projeto.
- Qualquer rota inexistente — página de erro.
