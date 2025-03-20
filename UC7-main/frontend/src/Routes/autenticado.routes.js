import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Perfil from "../Pages/Perfil/Perfil"
import Editar from "../Pages/Editar/Editar"
import PaginaInicial from "../Pages/Pagina-Inicial/PaginaInicial"
import Pesquisa from "../Pages/Pagina-pesquisa/Pesquisar"
import PageVinhoInfo from "../Pages/Vinho/PageVinhoInfo"
import MinhaLista from "../Pages/Minha-Lista/MinhaLista"


export default function Autenticado() {
    return (
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                <Route path="/pagina-Inicial" element={<PaginaInicial />} />
                <Route path="/Perfil" element={<Perfil />} />
                <Route path="/EditarUsuarios/:id" element={<Editar />} />
                <Route path="/pesquisar" element={<Pesquisa />} />
                <Route path="/vinhoInformacoes/:id" element={<PageVinhoInfo />} />
                <Route path="/minhaLista" element={<MinhaLista />} />
=======
                <Route path="/pagina-Inicial" element={<PaginaInicial/>}/>
                <Route path="/Perfil" element={<Perfil/>}/>
                <Route path="/EditarUsuarios/:id" element={<Editar/>} /> 
                <Route path="/pesquisar" element={<Pesquisa/>} />
                <Route path="/vinhoInformacoes/:id" element={<PageVinhoInfo/>} />
                <Route path="/minhaLista" element={<MinhaLista/>} />
>>>>>>> parent of d8231ef4 (19/03)

                <Route path="*" element={<PaginaInicial />} />
            </Routes>
        </BrowserRouter>
    )
}