import { useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard.jsx'
import styles from './MovieList.module.css'

function MovieList({ filmes, aoExcluir, aoAdicionar }) {
  const [busca, setBusca] = useState('')
  const [buscaApi, setBuscaApi] = useState('')
  const [resultados, setResultados] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const filmesFiltrados = filmes.filter((filme) =>
    filme.nome.toLowerCase().includes(busca.toLowerCase()),
  )

  async function pesquisarNaApi(event) {
    event.preventDefault()
    if (!buscaApi.trim()) return

    const chave = import.meta.env.VITE_OMDB_API_KEY
    if (!chave) {
      setErro('Falta configurar a chave da OMDb. Veja o arquivo .env.example.')
      return
    }

    setCarregando(true)
    setErro('')
    setResultados([])

    try {
      const url = `https://www.omdbapi.com/?apikey=${chave}&s=${encodeURIComponent(buscaApi)}&type=movie`
      const resposta = await fetch(url)
      const dados = await resposta.json()

      if (dados.Response === 'True') {
        setResultados(dados.Search)
      } else {
        setErro(dados.Error || 'Não encontramos esse filme.')
      }
    } catch {
      setErro('Não foi possível conectar à API. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  async function adicionarDaApi(id) {
    const chave = import.meta.env.VITE_OMDB_API_KEY
    try {
      const resposta = await fetch(`https://www.omdbapi.com/?apikey=${chave}&i=${id}&plot=full`)
      const filme = await resposta.json()

      if (filme.Response === 'True') {
        aoAdicionar({
          nome: filme.Title,
          genero: filme.Genre === 'N/A' ? 'Não informado' : filme.Genre,
          ano: filme.Year,
          assistido: false,
          poster: filme.Poster,
          diretor: filme.Director,
          sinopse: filme.Plot,
          imdbID: filme.imdbID,
        })
        setResultados((atuais) => atuais.filter((item) => item.imdbID !== id))
      } else {
        setErro('Não foi possível carregar os detalhes desse filme.')
      }
    } catch {
      setErro('Erro ao adicionar o filme. Verifique sua conexão.')
    }
  }

  return (
    <section>
      <div className={styles.topo}>
        <div>
          <h1>Meus filmes</h1>
          <p>Organize os filmes que você já assistiu ou quer assistir.</p>
        </div>
        <Link to="/adicionar" className={styles.botao}>+ Novo filme</Link>
      </div>

      <div className={styles.areaApi}>
        <h2>Encontrar filmes</h2>
        <p>Pesquise na OMDb e adicione um filme à sua lista.</p>
        <form className={styles.formBusca} onSubmit={pesquisarNaApi}>
          <input
            value={buscaApi}
            onChange={(event) => setBuscaApi(event.target.value)}
            placeholder="Ex.: Interestelar, Batman..."
            aria-label="Pesquisar filme na OMDb"
          />
          <button type="submit" disabled={carregando}>
            {carregando ? 'Pesquisando...' : 'Buscar na API'}
          </button>
        </form>
        {erro && <p className={styles.erro}>{erro}</p>}
        {resultados.map((filme) => (
          <div className={styles.resultado} key={filme.imdbID}>
            <span>{filme.Title} ({filme.Year})</span>
            <button type="button" onClick={() => adicionarDaApi(filme.imdbID)}>
              Adicionar
            </button>
          </div>
        ))}
      </div>

      <h2 className={styles.tituloLista}>Minha lista</h2>
      <input
        className={styles.busca}
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
        placeholder="Filtrar meus filmes..."
        aria-label="Filtrar filmes cadastrados"
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
