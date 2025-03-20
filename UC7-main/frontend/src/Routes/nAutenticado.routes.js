import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "../Pages/Inicio/Inicio";
import Cadastro from "../Pages/Registro/Cadastro";
import PaginaInicial from "../Pages/Pagina-Inicial/PaginaInicial";
import Perfil from "../Pages/Perfil/Perfil"
import Editar from "../Components/Editar/EditarUsuarios";
import Pesquisar from "../Pages/Pagina-pesquisa/Pesquisar";
import PageVinhoInfo from "../Pages/Vinho/PageVinhoInfo";
import MinhaLista from "../Pages/Minha-Lista/MinhaLista"

export default function NAutenticado() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cadastro" element={<Cadastro />} />
<<<<<<< HEAD
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/paginaInical" element={<PaginaInicial />} />
        <Route path="/EditarUsuarios/:id" element={<Editar />} />
        <Route path="/pesquisar" element={<Pesquisar />} />
        <Route path="/vinhoInformacoes/:id" element={<PageVinhoInfo />} />
        <Route path="/minhaLista" element={<MinhaLista />} />
=======
        <Route path="/Perfil" element={<Perfil/>}/>
                <Route path="/paginaInical" element={<PaginaInicial/>}/>
                <Route path="/EditarUsuarios/:id" element={<Editar/>} />
                <Route path="/pesquisar" element={<Pesquisar/>} />
                <Route path="/vinhoInformacoes/:id" element={<PageVinhoInfo/>} />
                <Route path="/minhaLista" element={<MinhaLista/>} />
>>>>>>> parent of d8231ef4 (19/03)

        <Route path="*" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
}
