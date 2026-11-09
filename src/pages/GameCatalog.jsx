import { useEffect, useState } from 'react'
import GameCard from '../components/GameCard.jsx'
import styles from './GameCatalog.module.css'

function GameCatalog({ jogos, aoAdicionar }) {
  const [catalogo, setCatalogo] = useState([])
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarJogos() {
      try {
        const resposta = await fetch('https://www.freetogame.com/api/games?platform=pc')
        if (!resposta.ok) throw new Error('Falha ao carregar o catálogo')
        const dados = await resposta.json()
        setCatalogo(dados)
      } catch {
        setErro('Não foi possível carregar os jogos. Tente novamente mais tarde.')
      } finally {
        setCarregando(false)
      }
    }

    carregarJogos()
  }, [])

  const jogosEncontrados = catalogo.filter((jogo) =>
    jogo.title.toLowerCase().includes(busca.toLowerCase()),
  )

  function enviarBusca(event) {
    event.preventDefault()
  }

  return (
    <section>
      <div className={styles.topo}>
        <h1>Catálogo de jogos</h1>
        <p>Explore jogos gratuitos e adicione seus favoritos à sua lista.</p>
      </div>

      <form aria-label="Pesquisar jogos" onSubmit={enviarBusca}>
        <label className={styles.rotuloBusca}>
          Pesquisar pelo nome
          <input
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Ex.: Overwatch"
          />
        </label>
      </form>

      {carregando && <p className={styles.mensagem}>Carregando jogos...</p>}
      {erro && <p className={styles.erro}>{erro}</p>}
      {!carregando && !erro && jogosEncontrados.length === 0 && (
        <p className={styles.mensagem}>Nenhum jogo encontrado com esse nome.</p>
      )}

      <div className={styles.grade}>
        {jogosEncontrados.slice(0, 30).map((jogo) => {
          const jaAdicionado = jogos.some((item) => item.id === jogo.id)
          return (
            <GameCard
              key={jogo.id}
              jogo={jogo}
              textoAcao={jaAdicionado ? 'Já está na lista' : 'Adicionar à minha lista'}
              aoAcionar={aoAdicionar}
            />
          )
        })}
      </div>
      {!busca && jogosEncontrados.length > 30 && (
        <p className={styles.mensagem}>Mostrando 30 jogos. Pesquise para encontrar outros.</p>
      )}
    </section>
  )
}

export default GameCatalog
