import { initFirebase } from './utils/Utils.js';
import logo from './logo.png';
import './style.css';
import LoginLink from './components/LoginLink.js';
import Navigacija from './components/Navigacija.js';
import PrikaziBlogove from './components/PrikaziBlogove.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Autor from "./components/Autor";
import Kontakt from "./components/Kontakt";
import BlogDetalji from './components/BlogDetalji.js';
import Registracija from './components/Registracija.js';
import Administracija from './components/Administracija.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import NoviBlog from './components/NoviBlog.js';

initFirebase()

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <h1>Blog, na vrh jezika, bez kočnica</h1>
          <Navigacija></Navigacija>

        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<PrikaziBlogove/>}></Route>
            <Route path="/autor" element={<Autor />}></Route>
            <Route path="/kontakt" element={<Kontakt />}></Route>
            <Route path="/login" element={<LoginLink />}></Route>
            <Route path="/blogovi" element={<PrikaziBlogove />} />
            <Route path="/blog/:id" element={<BlogDetalji />} />
            <Route path="/registracija" element={<Registracija />} />
            <Route path="/administracija" element={<ProtectedRoute><Administracija /></ProtectedRoute>} />
            <Route path="/novi-blog" element={<NoviBlog />}/>
            <Route path="/novi-blog/:id" element={<NoviBlog />}/>
          </Routes>
          
        </main>
        <footer className="footer">&copy; 2026 Blog na vrh jezika bez kočnica</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
