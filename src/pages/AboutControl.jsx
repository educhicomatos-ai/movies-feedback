import styles from './SimplePage.module.css'

function About() {
  return (
    <section className={styles.pagina}>
      <h1>Sobre o projeto</h1>
      <p>
        O Movies Feedback é uma aplicação para cadastrar e organizar os filmes
        que já foram assistidos ou que ainda queremos assistir.
      </p>
      <p>Projeto desenvolvido para a disciplina de Programação Web II.</p>
    </section>
  )
}

export default About
