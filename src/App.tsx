import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListPassagens from "./components/passagens/listpassagens/ListPassagens";
import Cadastro from "./pages/cadastro/Cadastro";
import Sobre from "./pages/sobre/Sobre";
import ListaCaronas from "./components/caronas/listacaronas/ListaCaronas";
import DetalhesCarona from "./components/caronas/detalhescarona/DetalhesCarona";
import FormCaronas from "./components/caronas/formcaronas/FormCaronas";

import ModalDeletarPassagem from "./components/passagens/deletarpassagem/ModalDeletarPassagem";
import FaleConosco from "./pages/faleconosco/FaleConosco";
import AjudaSuporte from "./pages/ajudasuporte/AjudaSuporte";
import Termos from "./pages/termos/Termos";

import PaginaPerfil from "./pages/perfil/PaginaPerfil";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh] bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/passagens" element={<ListPassagens />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/faleconosco" element={<FaleConosco />} />
              <Route path="/ajudasuporte" element={<AjudaSuporte />} />
              <Route path="/termos" element={<Termos />} />
              <Route path="/caronas" element={<ListaCaronas />} />
              <Route path="/caronas/:id" element={<DetalhesCarona />} />
              <Route path="cadastrarcarona" element={<FormCaronas />} />
              <Route path="/perfil" element={<PaginaPerfil />} />
              <Route path="/caronas">
                <Route index element={<ListaCaronas />} />
                <Route path="cadastrar" element={<FormCaronas />} />
                <Route path=":id" element={<DetalhesCarona />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
