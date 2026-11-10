// Estado local usado para controlar os campos e o jogo em edição.
import { useState } from 'react'
// Cartão de jogo compartilhado com o catálogo e estilos desta página.
import GameCard from '../components/GameCard.jsx'
import styles from './MyGames.module.css'

// Recebe a lista de jogos e as funções de cadastro, edição, remoção e avaliação.
function MyGames({ jogos, aoCriar, aoEditar, aoRemover, aoAvaliar }) {
  // Guarda os valores dos campos e, quando aplicável, os dados em edição.
  const [titulo, setTitulo] = useState('')
  const [genero, setGenero] = useState('')
  const [jogoEmEdicao, setJogoEmEdicao] = useState(null)

  // Valida o envio do formulário e envia os campos limpos para a aplicação principal.
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

  // Envia para a aplicação principal as alterações feitas no jogo selecionado.
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
        {/* Os valores destes campos são controlados pelos estados desta página. */}
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

      {/* O formulário de edição só aparece depois de o usuário escolher um jogo para editar. */}
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

      {/* Se não houver jogos, mostra uma orientação; caso contrário, cria um cartão para cada item. */}
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
