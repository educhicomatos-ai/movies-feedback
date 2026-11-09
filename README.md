# Movies Feedback

Projeto de catálogo de filmes feito com React.

## Como executar

1. Abra a pasta do projeto no VS Code.
2. No terminal, execute `npm install`.
3. Crie uma conta/chave gratuita na página da OMDb: https://www.omdbapi.com/apikey.aspx
4. Faça uma cópia do arquivo `.env.example` e renomeie a cópia para `.env.local`.
5. No `.env.local`, coloque sua chave depois do sinal de igual:

   `VITE_OMDB_API_KEY=sua_chave_aqui`

6. Execute `npm run dev` e abra o endereço mostrado no terminal.

## O que o projeto faz

- Pesquisa filmes na OMDb usando `fetch`.
- Mostra carregamento e mensagens quando ocorre algum erro.
- Permite adicionar filmes encontrados à lista pessoal.
- Permite cadastrar, editar, listar, filtrar e excluir filmes.
- Guarda a lista no `localStorage`, então ela continua salva depois de atualizar a página.
- Usa React Router para navegar entre as páginas.
- Usa CSS Modules para os estilos.

## Como a API funciona

A pesquisa usa o parâmetro `s` da OMDb para encontrar títulos. Quando você escolhe um resultado, o projeto faz outra consulta usando o `imdbID` (`i`) para buscar os detalhes, como gênero, diretor, sinopse e pôster.

**Observação para apresentação:** a chave colocada em uma aplicação React aparece no navegador. Para um projeto escolar/demonstração está tudo bem, mas em um sistema publicado de verdade o ideal é esconder a chave em um servidor.
