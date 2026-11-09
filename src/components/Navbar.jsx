import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar({ nome }) {
  return (
    <header className={styles.cabecalho}>
      <div className={styles.conteudo}>
        <Link to="/" className={styles.logo}>{nome}</Link>
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
