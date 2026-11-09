import { useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard.jsx'
import styles from './MovieList.module.css'

function MovieList({ filmes, aoExcluir }) {
  const [busca, setBusca] = useState('')
  const filmesFiltrados = filmes.filter((filme) =>
    filme.nome.toLowerCase().includes(busca.toLowerCase()),
  )

  return (
    <section>
      <div className={styles.topo}>
        <div>
          <h1>Meus filmes</h1>
          <p>Organize os filmes que você já assistiu ou quer assistir.</p>
        </div>
        <Link to="/adicionar" className={styles.botao}>+ Novo filme</Link>
      </div>
      <input
        className={styles.busca}
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
        placeholder="Pesquisar pelo nome..."
        aria-label="Pesquisar filmes pelo nome"
      />
      {filmesFiltrados.length === 0 ? (
        <p className={styles.vazio}>Nenhum filme encontrado.</p>
      ) : (
        filmesFiltrados.map((filme) => (
          <MovieCard key={filme.id} filme={filme} aoExcluir={aoExcluir} />
        ))
      )}
    </section>
  )
}

export default MovieList
