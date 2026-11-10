// Estilos compartilhados pelas páginas simples de texto.
import styles from './SimplePage.module.css'

// Apresenta ao usuário o objetivo e as características principais do projeto.
function About() {
  return (
    <section className={styles.pagina}>
      <h1>Sobre o projeto</h1>
      <p>
        Jogos & Avaliações usa uma API pública para mostrar jogos gratuitos.
        Você pode montar uma lista pessoal e dar uma nota de uma a cinco estrelas.
      </p>
      <p>A lista e as avaliações ficam salvas no navegador.</p>
      <p>Projeto desenvolvido para a disciplina de Programação Web II.</p>
    </section>
  )
}

export default About
