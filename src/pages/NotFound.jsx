import { Link } from 'react-router-dom'
import styles from './SimplePage.module.css'

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
