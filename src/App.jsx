import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import About from './pages/AboutControl.jsx'
import GameCatalog from './pages/GameCatalog.jsx'
import MyGames from './pages/MyGames.jsx'
import NotFound from './pages/NotFound.jsx'
import styles from './App.module.css'

function App() {
  const [jogos, setJogos] = useState(() => {
    const jogosSalvos = localStorage.getItem('jogos')
    return jogosSalvos ? JSON.parse(jogosSalvos) : []
  })

  useEffect(() => {
    localStorage.setItem('jogos', JSON.stringify(jogos))
  }, [jogos])

  function adicionarJogo(jogo) {
    setJogos((atuais) => {
      if (atuais.some((item) => item.id === jogo.id)) return atuais
      return [...atuais, { ...jogo, avaliacao: 0 }]
    })
  }

  function criarJogo(jogo) {
    setJogos((atuais) => [...atuais, { ...jogo, id: `meu-jogo-${Date.now()}`, avaliacao: 0 }])
  }

  function editarJogo(jogoAtualizado) {
    setJogos((atuais) =>
      atuais.map((jogo) =>
        jogo.id === jogoAtualizado.id ? { ...jogo, ...jogoAtualizado } : jogo,
      ),
    )
  }

  function removerJogo(id) {
    setJogos((atuais) => atuais.filter((jogo) => jogo.id !== id))
  }

  function avaliarJogo(id, nota) {
    setJogos((atuais) =>
      atuais.map((jogo) => (jogo.id === id ? { ...jogo, avaliacao: nota } : jogo)),
    )
  }

  return (
    <div className={styles.app}>
      <Navbar nome="Jogos & Avaliações" />
      <main className={styles.conteudo}>
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
