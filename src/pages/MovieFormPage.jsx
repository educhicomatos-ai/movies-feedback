import { useNavigate, useParams } from 'react-router-dom'
import MovieForm from '../components/MovieForm.jsx'

function MovieFormPage({ filmes, aoSalvar }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const filme = id ? filmes.find((item) => item.id === id) : null

  if (id && !filme) {
    return (
      <section>
        <h1>Filme não encontrado</h1>
        <p>Esse filme não está cadastrado.</p>
        <button type="button" onClick={() => navigate('/')}>Voltar para o início</button>
      </section>
    )
  }

  function salvar(dados) {
    aoSalvar(id ? { ...dados, id } : dados)
    navigate('/')
  }

  return (
    <section>
      <h1>{id ? 'Editar filme' : 'Adicionar filme'}</h1>
      <p>Preencha as informações abaixo.</p>
      <MovieForm
        filmeInicial={filme}
        aoSalvar={salvar}
        textoBotao={id ? 'Salvar alterações' : 'Cadastrar filme'}
      />
    </section>
  )
}

export default MovieFormPage
