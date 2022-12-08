import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import Autor from './componentes/telas/autor/Autor';
import Genero from './componentes/telas/genero/Genero';
import Livro from './componentes/telas/livro/Livro';

function App() {
  return (
    <Router>
      <Menu />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact="true" path="/autores" element={<Autor/>}/>
          <Route exact="true" path="/generos" element={<Genero/>}/>
          <Route exact="true" path="/livros" element={<Livro/>}/>
        </Routes>
    </Router>
  );
}

export default App;
