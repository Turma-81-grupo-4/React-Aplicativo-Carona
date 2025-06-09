import DeletarPassagem from "./components/passagens/deletarpassagem/DeletarPassagem";
import Perfil from "./pages/perfil/Perfil";

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

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/passagens" element={<ListPassagens />} />
              <Route path="/caronas" element={<ListaCaronas />} />
              <Route path="/caronas/:id" element={<DetalhesCarona />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/deletarpassagem/:id" element={<DeletarPassagem />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/caronas" element={<ListaCaronas />} />
              <Route path="/caronas/:id" element={<DetalhesCarona />} />
              <Route path="cadastrarcarona" element={<FormCaronas />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
