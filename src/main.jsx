// Recursos do React para renderizar a aplicação no navegador.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Componente que permite navegar pelas rotas sem recarregar a página.
import { BrowserRouter } from 'react-router-dom'
// Estilos globais e componente raiz da aplicação.
import './index.css'
import App from './App.jsx'

// Encontra o elemento root do HTML e monta nele toda a interface React.
createRoot(document.getElementById('root')).render(
  // StrictMode ajuda a identificar problemas durante o desenvolvimento.
  <StrictMode>
    {/* BrowserRouter disponibiliza a navegação por endereço para App. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
