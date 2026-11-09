import { useState } from 'react'
import GameCard from '../components/GameCard.jsx'
import styles from './MyGames.module.css'

function MyGames({ jogos, aoCriar, aoEditar, aoRemover, aoAvaliar }) {
  const [titulo, setTitulo] = useState('')
  const [genero, setGenero] = useState('')
  const [jogoEmEdicao, setJogoEmEdicao] = useState(null)

  function criarJogo(event) {
    event.preventDefault()
    aoCriar({
      title: titulo.trim(),
      genre: genero.trim(),
      platform: 'Minha lista',
      short_description: '',
    })
    setTitulo('')
    setGenero('')
  }

  function salvarEdicao(event) {
    event.preventDefault()
    aoEditar(jogoEmEdicao)
    setJogoEmEdicao(null)
  }

  return (
    <section>
      <div className={styles.topo}>
        <h1>Minha lista de jogos</h1>
        <p>Adicione, edite e avalie jogos. Seus dados ficam salvos neste navegador.</p>
      </div>

      <form className={styles.formulario} onSubmit={criarJogo}>
        <h2>Adicionar um jogo</h2>
        <label>
          Nome do jogo
          <input
            required
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            placeholder="Ex.: Stardew Valley"
          />
        </label>
        <label>
          Gênero
          <input
            required
            value={genero}
            onChange={(event) => setGenero(event.target.value)}
            placeholder="Ex.: Simulação"
          />
        </label>
        <button type="submit">Adicionar à lista</button>
      </form>

      {jogoEmEdicao && (
        <form className={styles.formulario} onSubmit={salvarEdicao}>
          <h2>Editando jogo</h2>
          <label>
            Nome do jogo
            <input
              required
              value={jogoEmEdicao.title}
              onChange={(event) =>
                setJogoEmEdicao({ ...jogoEmEdicao, title: event.target.value })
              }
            />
          </label>
          <label>
            Gênero
            <input
              required
              value={jogoEmEdicao.genre}
              onChange={(event) =>
                setJogoEmEdicao({ ...jogoEmEdicao, genre: event.target.value })
              }
            />
          </label>
          <div className={styles.acoesFormulario}>
            <button type="submit">Salvar alterações</button>
            <button type="button" className={styles.botaoCancelar} onClick={() => setJogoEmEdicao(null)}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {jogos.length === 0 ? (
        <p className={styles.vazio}>Sua lista está vazia. Adicione jogos pelo catálogo.</p>
      ) : (
        <div className={styles.grade}>
          {jogos.map((jogo) => (
            <GameCard
              key={jogo.id}
              jogo={jogo}
              textoAcao="Remover da lista"
              aoAcionar={() => aoRemover(jogo.id)}
              textoEditar="Editar"
              aoEditar={() => setJogoEmEdicao({ ...jogo })}
              aoAvaliar={aoAvaliar}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default MyGames
