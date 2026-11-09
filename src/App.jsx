//import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import './pages/Home.css'

import About from './pages/About'
import './pages/About.css'


import NotFound from './pages/NotFound'
import './pages/NotFound.css'



function App() {
  

  return (
    <>
      <BrowserRouter>

        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/filmes" element={<Movies />} />
          {/* <Route path="/contato" element={<Contato />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
