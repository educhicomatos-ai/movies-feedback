// Hooks usados para guardar os jogos na tela e reagir a mudanças nessa lista.
import { useEffect, useState } from 'react'
// Componentes que definem as páginas acessíveis por cada endereço.
import { Route, Routes } from 'react-router-dom'
// Componentes visuais compartilhados e páginas do projeto.
import Navbar from './components/Navbar.jsx'
import About from './pages/AboutControl.jsx'
import GameCatalog from './pages/GameCatalog.jsx'
import MyGames from './pages/MyGames.jsx'
import NotFound from './pages/NotFound.jsx'
// Estilos exclusivos do componente principal.
import styles from './App.module.css'

function App() {
  // Recupera a lista salva no navegador ao iniciar; se não houver dados, começa vazia.
  const [jogos, setJogos] = useState(() => {
    const jogosSalvos = localStorage.getItem('jogos')
    return jogosSalvos ? JSON.parse(jogosSalvos) : []
  })

  // Mantém a cópia do localStorage atualizada sempre que a lista muda.
  useEffect(() => {
    localStorage.setItem('jogos', JSON.stringify(jogos))
  }, [jogos])

  // Adiciona um jogo do catálogo, evitando duplicatas pelo identificador.
  function adicionarJogo(jogo) {
    setJogos((atuais) => {
      if (atuais.some((item) => item.id === jogo.id)) return atuais
      return [...atuais, { ...jogo, avaliacao: 0 }]
    })
  }

  // Cadastra um jogo digitado pelo usuário com um identificador próprio.
  function criarJogo(jogo) {
    setJogos((atuais) => [...atuais, { ...jogo, id: `meu-jogo-${Date.now()}`, avaliacao: 0 }])
  }

  // Substitui os dados do jogo que tem o mesmo id, mantendo os demais jogos.
  function editarJogo(jogoAtualizado) {
    setJogos((atuais) =>
      atuais.map((jogo) =>
        jogo.id === jogoAtualizado.id ? { ...jogo, ...jogoAtualizado } : jogo,
      ),
    )
  }

  // Cria uma nova lista sem o jogo cujo id foi solicitado para remoção.
  function removerJogo(id) {
    setJogos((atuais) => atuais.filter((jogo) => jogo.id !== id))
  }

  // Atualiza somente a nota do jogo selecionado.
  function avaliarJogo(id, nota) {
    setJogos((atuais) =>
      atuais.map((jogo) => (jogo.id === id ? { ...jogo, avaliacao: nota } : jogo)),
    )
  }

  return (
    <div className={styles.app}>
      {/* O cabeçalho aparece em todas as páginas. */}
      <Navbar nome="Jogos & Avaliações" />
      <main className={styles.conteudo}>
        {/* Cada rota mostra uma página e recebe os dados e ações de que precisa. */}
        <Routes>
          <Route
            path="/"
            element={<GameCatalog jogos={jogos} aoAdicionar={adicionarJogo} />}
          />
          <Route
            path="/lista"
            element={
              <MyGames
                jogos={jogos}
                aoCriar={criarJogo}
                aoEditar={editarJogo}
                aoRemover={removerJogo}
                aoAvaliar={avaliarJogo}
              />
            }
          />
          <Route path="/sobre" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
