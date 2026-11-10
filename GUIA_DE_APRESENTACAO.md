# Guia de apresentação — Jogos & Avaliações

## 1. Visão geral

Este projeto é um site feito com React para explorar jogos gratuitos de PC, criar uma lista pessoal e avaliar os jogos com notas de uma a cinco estrelas. O catálogo vem da API pública FreeToGame. Os jogos da lista e suas notas ficam guardados no `localStorage` do navegador.

## 2. Arquivos do projeto

### Arquivos da aplicação

- `index.html`: página HTML inicial. Define informações básicas da página, o elemento `root` onde o React monta a interface e carrega `src/main.jsx`.
- `src/main.jsx`: ponto de entrada. Importa os estilos globais e envolve o componente principal com `StrictMode` e `BrowserRouter`.
- `src/App.jsx`: componente que mantém a lista de jogos, salva os dados no `localStorage`, implementa cadastro/edição/remoção/avaliação e declara as rotas.
- `src/App.module.css`: define o tamanho mínimo e a largura do conteúdo principal.
- `src/index.css`: estilos gerais compartilhados, como fonte, fundo, cores e comportamento de links e controles.
- `src/components/Navbar.jsx`: cabeçalho com o nome do projeto e os links de navegação.
- `src/components/Navbar.module.css`: aparência e organização do cabeçalho, incluindo ajuste para telas estreitas.
- `src/components/GameCard.jsx`: cartão reutilizável que mostra os dados, a imagem, a avaliação e as ações disponíveis para cada jogo.
- `src/components/GameCard.module.css`: estilos da imagem, textos, estrelas, links e botões do cartão.
- `src/pages/GameCatalog.jsx`: consulta os jogos à API, permite pesquisar pelo título e adicionar um resultado à lista pessoal.
- `src/pages/GameCatalog.module.css`: estilos do cabeçalho, pesquisa, mensagens e grade de cartões do catálogo.
- `src/pages/MyGames.jsx`: permite cadastrar jogos manualmente, editar seus dados, avaliá-los e removê-los.
- `src/pages/MyGames.module.css`: estilos dos formulários, mensagens e cartões da lista pessoal.
- `src/pages/AboutControl.jsx`: página com uma breve explicação do projeto.
- `src/pages/NotFound.jsx`: página mostrada quando o endereço não corresponde a nenhuma rota conhecida.
- `src/pages/SimplePage.module.css`: estilos compartilhados pela página Sobre e pela página não encontrada.

### Configuração e documentação

- `package.json`: nome, scripts de execução e dependências declaradas do projeto. É JSON, portanto não aceita comentários JavaScript válidos; foi mantido intacto.
- `package-lock.json`: registra versões específicas das dependências instaladas. É um arquivo de dependências e foi mantido intacto.
- `vite.config.js`: ativa o plugin React no Vite.
- `eslint.config.js`: configura as regras de análise estática e os arquivos que o ESLint verifica.
- `README.md`: instruções existentes de instalação, execução e uso. Foi mantido intacto.
- `.gitignore`: lista arquivos e pastas que o Git deve ignorar. Foi mantido intacto.
- `GUIA_DE_APRESENTACAO.md`: este guia complementar.

## 3. Principais funções e fluxos

- **Carregamento do catálogo:** `GameCatalog` executa `fetch` para consultar a API FreeToGame. `async` e `await` aguardam a resposta; `try/catch/finally` trata falha e encerra o indicador de carregamento.
- **Pesquisa:** o estado `busca` acompanha o texto digitado. `filter` mantém os jogos cujo título contém esse texto, sem diferenciar letras maiúsculas de minúsculas.
- **Adicionar do catálogo:** `adicionarJogo` confere com `some` se o jogo já está na lista e evita repeti-lo. Se for novo, ele é incluído com avaliação inicial zero.
- **Cadastro manual:** `criarJogo` em `MyGames` lê os campos do formulário, remove espaços extras e chama a função de cadastro recebida por props. `App` atribui um identificador ao novo jogo.
- **Edição:** o formulário de edição guarda os valores alterados e chama `editarJogo`. A função percorre a lista com `map` e substitui somente o item com o mesmo identificador.
- **Remoção:** `removerJogo` usa `filter` para produzir uma lista sem o item escolhido.
- **Avaliação:** os botões de estrelas enviam o identificador do jogo e a nota. `avaliarJogo` atualiza a nota correspondente.
- **Persistência:** `App` lê os dados salvos na inicialização e usa um efeito para gravar a lista atual no `localStorage` sempre que ela muda.
- **Navegação:** `BrowserRouter`, `Routes` e `Route` permitem alternar entre catálogo, lista, Sobre e página não encontrada sem recarregar a página.
- **Cartões e props:** `GameCard` recebe os dados e as ações pela interface de props. Assim, o mesmo componente pode ser usado no catálogo e na lista pessoal.

## 4. Tecnologias utilizadas

- **React:** biblioteca para construir a interface em componentes e atualizar a tela conforme os estados mudam.
- **React DOM:** conecta a árvore de componentes React ao elemento HTML `root`.
- **React Router:** organiza a navegação pelas rotas internas.
- **JavaScript e JSX:** implementam a lógica e permitem escrever marcação de interface dentro dos componentes.
- **CSS Modules e CSS:** aplicam estilos globais e estilos isolados para componentes e páginas.
- **Vite:** ferramenta de desenvolvimento e criação da versão de produção.
- **ESLint:** verifica problemas e padrões de código JavaScript/JSX.
- **FreeToGame API:** fornece informações dos jogos gratuitos exibidos no catálogo.
- **localStorage:** armazenamento do navegador usado para preservar a lista e as notas neste dispositivo.

## 5. Conceitos de programação presentes

- **Componentes:** partes da interface, como `Navbar`, `GameCard` e as páginas.
- **Props:** dados e funções enviados de um componente pai para um componente filho.
- **Estado (`useState`):** valores que podem mudar durante o uso e causam atualização da tela.
- **Efeito (`useEffect`):** executa uma ação relacionada ao ciclo de vida do componente; aqui, inicia a busca e salva alterações.
- **Renderização condicional:** `&&` e o operador ternário mostram elementos diferentes conforme os dados disponíveis.
- **Arrays e métodos:** `map` cria elementos da interface, `filter` seleciona ou remove itens e `some` verifica se existe uma duplicata.
- **Eventos e formulários controlados:** `onClick`, `onChange` e `onSubmit` respondem às ações do usuário; os valores dos campos vêm do estado.
- **Imutabilidade:** atualizações criam novos arrays/objetos usando espalhamento (`...`) em vez de alterar a lista existente diretamente.
- **Assincronismo:** `async`/`await` aguardam a comunicação com a API sem bloquear a interface.
- **Persistência local:** JSON converte a lista para texto ao gravar e recupera os objetos ao carregar.
- **CSS responsivo:** grades flexíveis e uma regra `@media` ajustam a disposição para diferentes larguras de tela.

## 6. Perguntas que o professor pode fazer

**Por que usar componentes?**  
Para dividir a interface em partes menores, que podem ser compreendidas e reutilizadas.

**O que são props?**  
São informações ou funções que um componente recebe de outro componente.

**Para que serve `useState`?**  
Para guardar valores que mudam durante o uso; quando o valor muda, o React atualiza a interface.

**O que faz `useEffect` neste projeto?**  
Ele inicia a consulta do catálogo quando a página é carregada e grava a lista no armazenamento local quando ela muda.

**Como os dados continuam disponíveis depois de atualizar a página?**  
O projeto salva a lista no `localStorage` e a lê novamente ao iniciar.

**Como funciona a pesquisa?**  
O texto digitado fica no estado `busca`; `filter` compara esse texto com os títulos dos jogos.

**Por que a avaliação começa em zero?**  
Para representar que o jogo ainda não recebeu uma nota.

**Como o projeto evita adicionar o mesmo jogo duas vezes pelo catálogo?**  
`some` procura na lista um item com o mesmo `id` antes de adicionar.

**O que ocorre se a API falhar?**  
O bloco `catch` define uma mensagem de erro e o `finally` encerra o carregamento.

**Para que serve o React Router?**  
Para trocar entre páginas com base no endereço, sem recarregar o documento inteiro.

## 7. Roteiro para apresentação oral

1. “Este projeto se chama Jogos & Avaliações. Ele permite consultar jogos gratuitos, criar uma lista pessoal e dar notas.”
2. “A aplicação foi dividida em componentes. O `App` organiza os dados e as rotas, e os componentes menores cuidam do menu, dos cartões e das páginas.”
3. “O catálogo consulta a API FreeToGame usando `fetch`. Enquanto espera, mostra uma mensagem de carregamento e, se falhar, mostra um aviso.”
4. “A pesquisa filtra os títulos conforme eu digito. Posso adicionar um jogo do catálogo ou cadastrar um jogo manualmente.”
5. “Na minha lista posso editar, avaliar e remover jogos. Essas ações atualizam o estado da aplicação.”
6. “A lista é salva no `localStorage`, então continua no navegador após atualizar a página.”
7. “A navegação é feita com React Router. Também há páginas Sobre e de endereço não encontrado.”
8. “O projeto usa React, JavaScript, CSS Modules, Vite e uma API pública. Obrigado.”
