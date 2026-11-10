// Hook de efeito para carregar os dados e estado para guardar os valores da tela.
import { useEffect, useState } from 'react'
// Cartão reutilizável e estilos do catálogo.
import GameCard from '../components/GameCard.jsx'
import styles from './GameCatalog.module.css'

// Recebe a lista pessoal e a ação de adicionar um jogo a ela.
function GameCatalog({ jogos, aoAdicionar }) {
  // Estados para os resultados da API, texto da pesquisa, carregamento e erro.
  const [catalogo, setCatalogo] = useState([])
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // Busca os jogos ao abrir o catálogo; a lista vazia de dependências evita buscas por renderização.
  useEffect(() => {
    async function carregarJogos() {
      try {
        // fetch consulta a API e await espera cada resposta antes de continuar.
        const resposta = await fetch('https://www.freetogame.com/api/games?platform=pc')
        if (!resposta.ok) throw new Error('Falha ao carregar o catálogo')
        const dados = await resposta.json()
        setCatalogo(dados)
      } catch {
        // Informa na tela que a consulta não pôde ser concluída.
        setErro('Não foi possível carregar os jogos. Tente novamente mais tarde.')
      } finally {
        // Encerra o estado de carregamento tanto em sucesso quanto em erro.
        setCarregando(false)
      }
    }

    carregarJogos()
  }, [])

  // Mantém somente jogos cujo título contém o texto digitado, sem diferenciar maiúsculas.
  const jogosEncontrados = catalogo.filter((jogo) =>
    jogo.title.toLowerCase().includes(busca.toLowerCase()),
  )

  // Impede o envio tradicional do formulário, pois a pesquisa acontece enquanto se digita.
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
        {/* O input controlado atualiza o estado busca a cada alteração do usuário. */}
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
      {/* Exibe uma mensagem de lista vazia somente após terminar o carregamento. */}
      {!carregando && !erro && jogosEncontrados.length === 0 && (
        <p className={styles.mensagem}>Nenhum jogo encontrado com esse nome.</p>
      )}

      {/* Limita a exibição inicial a 30 resultados e indica se o jogo já está na lista. */}
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
