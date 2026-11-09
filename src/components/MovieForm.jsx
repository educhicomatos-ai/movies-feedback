import { useState } from 'react'
import styles from './MovieForm.module.css'

function MovieForm({ filmeInicial, aoSalvar, textoBotao }) {
  const [nome, setNome] = useState(() => filmeInicial?.nome ?? '')
  const [genero, setGenero] = useState(() => filmeInicial?.genero ?? '')
  const [ano, setAno] = useState(() => filmeInicial?.ano ?? '')
  const [assistido, setAssistido] = useState(() => filmeInicial?.assistido ? 'sim' : 'nao')

  function enviarFormulario(event) {
    event.preventDefault()
    aoSalvar({
      ...(filmeInicial || {}),
      nome,
      genero,
      ano,
      assistido: assistido === 'sim',
    })
  }

  return (
    <form className={styles.formulario} onSubmit={enviarFormulario}>
      <label>
        Nome do filme
        <input
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Ex.: Interestelar"
          required
        />
      </label>
      <label>
        Gênero
        <input
          value={genero}
          onChange={(event) => setGenero(event.target.value)}
          placeholder="Ex.: Aventura"
          required
        />
      </label>
      <label>
        Ano de lançamento
        <input
          type="number"
          min="1888"
          max="2100"
          value={ano}
          onChange={(event) => setAno(event.target.value)}
          placeholder="Ex.: 2024"
          required
        />
      </label>
      <label>
        Já assistiu?
        <select value={assistido} onChange={(event) => setAssistido(event.target.value)}>
          <option value="nao">Ainda não</option>
          <option value="sim">Sim</option>
        </select>
      </label>
      <button type="submit">{textoBotao}</button>
    </form>
  )
}

export default MovieForm
