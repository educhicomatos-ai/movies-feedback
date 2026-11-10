// Estilos aplicados ao cartão de cada jogo.
import styles from './GameCard.module.css'

// Recebe os dados e os textos/ações que variam conforme a tela onde o cartão aparece.
function GameCard({ jogo, textoAcao, aoAcionar, aoAvaliar, textoEditar, aoEditar }) {
  return (
    <article className={styles.card}>
      {/* A imagem só aparece quando o jogo tem uma miniatura cadastrada. */}
      {jogo.thumbnail && (
        <img
          className={styles.imagem}
          src={jogo.thumbnail}
          alt={`Imagem do jogo ${jogo.title}`}
          loading="lazy"
        />
      )}
      <div className={styles.informacoes}>
        {/* Mostra os dados principais disponíveis para o jogo. */}
        <h2>{jogo.title}</h2>
        <p>{jogo.genre} · {jogo.platform}</p>
        {jogo.short_description && <p>{jogo.short_description}</p>}
        {jogo.release_date && <p>Lançamento: {jogo.release_date.slice(0, 4)}</p>}
        {/* A área de avaliação aparece quando a tela fornece a função aoAvaliar. */}
        {aoAvaliar && (
          <div className={styles.avaliacao}>
            <span>Sua nota:</span>
            {/* Cada botão representa uma nota de uma a cinco estrelas. */}
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
        {/* O link externo só é mostrado para jogos que têm endereço próprio. */}
        {jogo.game_url && (
          <a className={styles.linkJogo} href={jogo.game_url} target="_blank" rel="noreferrer">
            Ver página do jogo
          </a>
        )}
        {/* Ações opcionais permitem reutilizar o cartão em diferentes contextos. */}
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
