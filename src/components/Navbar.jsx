// Link muda de página e NavLink também identifica visualmente a rota ativa.
import { Link, NavLink } from 'react-router-dom'
// Estilos do cabeçalho e do menu.
import styles from './Navbar.module.css'

// O nome exibido no logo é recebido da aplicação principal por uma prop.
function Navbar({ nome }) {
  return (
    <header className={styles.cabecalho}>
      <div className={styles.conteudo}>
        <Link to="/" className={styles.logo}>{nome}</Link>
        {/* Estes links levam às páginas definidas nas rotas do App. */}
        <nav className={styles.menu} aria-label="Navegação principal">
          <NavLink to="/">Catálogo</NavLink>
          <NavLink to="/lista">Minha lista</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
