import DeletarPassagem from "./components/passagens/deletarpassagem/DeletarPassagem";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Footer from './components/footer/Footer';
import { Home } from 'lucide-react';
import Login from './pages/login/Login';
import ListPassagens from './components/passagens/listpassagens/ListPassagens';
import Cadastro from './pages/cadastro/Cadastro';
import Sobre from './pages/sobre/Sobre';


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/listpassagens" element={<ListPassagens />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/deletarpassagem/:id" element={<DeletarPassagem />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
