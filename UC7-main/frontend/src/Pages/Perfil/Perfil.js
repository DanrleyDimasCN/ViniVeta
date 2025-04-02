import React from "react"
import UsuariosInfo from "../../Components/UsuarioInformacoes/UsuarioInfo"
import './perfil.scss'
import Footer from "../../Components/Footer/Footer"

export default function Perfil() {
    return (
        <div className="box-perfil-background">
            <UsuariosInfo/>
            <Footer/>
        </div>
    )
}