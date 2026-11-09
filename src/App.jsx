import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import About from './pages/AboutControl.jsx'
import MovieFormPage from './pages/MovieFormPage.jsx'
import MovieList from './pages/MovieList.jsx'
import NotFound from './pages/NotFound.jsx'
import styles from './App.module.css'

const filmesIniciais = [
  { id: '1', nome: 'Interestelar', genero: 'Ficção científica', ano: '2014', assistido: true },
  { id: '2', nome: 'O Rei Leão', genero: 'Animação', ano: '1994', assistido: false },
]

function carregarFilmes() {
  const dadosSalvos = localStorage.getItem('filmes')
  return dadosSalvos ? JSON.parse(dadosSalvos) : filmesIniciais
}

function App() {
  const [filmes, setFilmes] = useState(carregarFilmes)

  useEffect(() => {
    localStorage.setItem('filmes', JSON.stringify(filmes))
  }, [filmes])

  function adicionarFilme(novoFilme) {
    setFilmes((atuais) => [...atuais, { ...novoFilme, id: crypto.randomUUID() }])
  }

  function editarFilme(filmeAtualizado) {
    setFilmes((atuais) =>
      atuais.map((filme) => (filme.id === filmeAtualizado.id ? filmeAtualizado : filme)),
    )
  }

  function excluirFilme(id) {
    setFilmes((atuais) => atuais.filter((filme) => filme.id !== id))
  }

  return (
    <div className={styles.app}>
      <Navbar nome="Movies Feedback" />
      <main className={styles.conteudo}>
        <Routes>
          <Route
            path="/"
            element={<MovieList filmes={filmes} aoExcluir={excluirFilme} />}
          />
          <Route
            path="/filmes"
            element={<MovieList filmes={filmes} aoExcluir={excluirFilme} />}
          />
          <Route
            path="/adicionar"
            element={<MovieFormPage filmes={filmes} aoSalvar={adicionarFilme} />}
          />
          <Route
            path="/editar/:id"
            element={<MovieFormPage filmes={filmes} aoSalvar={editarFilme} />}
          />
          <Route path="/sobre" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
