import styles from './GameCard.module.css'

function GameCard({ jogo, textoAcao, aoAcionar, aoAvaliar, textoEditar, aoEditar }) {
  return (
    <article className={styles.card}>
      {jogo.thumbnail && (
        <img
          className={styles.imagem}
          src={jogo.thumbnail}
          alt={`Imagem do jogo ${jogo.title}`}
          loading="lazy"
        />
      )}
      <div className={styles.informacoes}>
        <h2>{jogo.title}</h2>
        <p>{jogo.genre} · {jogo.platform}</p>
        {jogo.short_description && <p>{jogo.short_description}</p>}
        {jogo.release_date && <p>Lançamento: {jogo.release_date.slice(0, 4)}</p>}
        {aoAvaliar && (
          <div className={styles.avaliacao}>
            <span>Sua nota:</span>
            {[1, 2, 3, 4, 5].map((nota) => (
              <button
                key={nota}
                type="button"
                className={nota <= jogo.avaliacao ? styles.estrelaAtiva : styles.estrela}
                onClick={() => aoAvaliar(jogo.id, nota)}
                aria-label={`Avaliar ${jogo.title} com ${nota} de 5 estrelas`}
              >
                ★
              </button>
            ))}
            <span>{jogo.avaliacao ? `${jogo.avaliacao}/5` : 'Ainda não avaliado'}</span>
          </div>
        )}
        {jogo.game_url && (
          <a className={styles.linkJogo} href={jogo.game_url} target="_blank" rel="noreferrer">
            Ver página do jogo
          </a>
        )}
        {aoEditar && (
          <button className={styles.botaoEditar} type="button" onClick={() => aoEditar(jogo)}>
            {textoEditar}
          </button>
        )}
        <button className={styles.botao} type="button" onClick={() => aoAcionar(jogo)}>
          {textoAcao}
        </button>
      </div>
    </article>
  )
}

export default GameCard
