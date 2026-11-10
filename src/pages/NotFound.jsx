// Link permite voltar ao início sem recarregar o site.
import { Link } from 'react-router-dom'
// Reaproveita a aparência das páginas simples.
import styles from './SimplePage.module.css'

// Esta página é exibida pela rota curinga quando o endereço não corresponde às demais rotas.
function NotFound() {
  return (
    <section className={styles.pagina}>
      <h1>Página não encontrada</h1>
      <p>O endereço que você tentou acessar não existe.</p>
      <Link to="/">Voltar para o início</Link>
    </section>
  )
}

export default NotFound
