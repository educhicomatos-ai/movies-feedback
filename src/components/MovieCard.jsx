import { Link } from 'react-router-dom'
import styles from './MovieCard.module.css'

function MovieCard({ filme, aoExcluir }) {
  return (
    <article className={styles.card}>
      {filme.poster && filme.poster !== 'N/A' && (
        <img className={styles.poster} src={filme.poster} alt={`Pôster de ${filme.nome}`} />
      )}
      <div className={styles.informacoes}>
        <h2>{filme.nome}</h2>
        <p>{filme.genero} • {filme.ano}</p>
        {filme.diretor && filme.diretor !== 'N/A' && <p>Direção: {filme.diretor}</p>}
        {filme.sinopse && filme.sinopse !== 'N/A' && <p>{filme.sinopse}</p>}
        <span className={filme.assistido ? styles.assistido : styles.pendente}>
          {filme.assistido ? 'Já assisti' : 'Quero assistir'}
        </span>
      </div>
      <div className={styles.acoes}>
        <Link to={`/editar/${filme.id}`} className={styles.editar}>Editar</Link>
        <button
          type="button"
          onClick={() => aoExcluir(filme.id)}
          className={styles.excluir}
          aria-label={`Excluir ${filme.nome}`}
        >
          Excluir
        </button>
      </div>
    </article>
  )
}

export default MovieCard
