import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Main from './pages/Main';
import Perfil from './pages/Perfil';
import PalpitesFutebol from './pages/PalpitesFutebol';
import PalpitesEsports from './pages/PalpitesEsports';
import Regras from './pages/Regras';
import FAQ from './pages/FAQ';
import JogosFutebol from './pages/JogosFutebol';
import Times from './pages/Times';
import Competicoes from './pages/Competicoes';
import SemanalFutebol from './pages/SemanalFutebol';

function App() {
  return (
    <>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Home/>} exact />
            <Route path='/main' element={<Main/>} />
            <Route path='/perfil' element={<Perfil/>} />
            <Route path='/regras' element={<Regras/>}/>
            <Route path='/faq' element={<FAQ/>}/>
            <Route path='/futebol' element={<PalpitesFutebol/>}/>
            <Route path='/esports' element={<PalpitesEsports/>}/>
            <Route path='/semanal' element={<SemanalFutebol/>} />
            <Route path='/jogos' element={<JogosFutebol/>}/>
            <Route path='/jogosesports' />
            <Route path='/times' element={<Times/>}/>
            <Route path='/competicoes' element={<Competicoes/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
