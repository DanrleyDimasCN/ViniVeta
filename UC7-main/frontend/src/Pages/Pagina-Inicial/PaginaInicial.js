import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import "../Pagina-Inicial/paginaInicial.scss"
import paginaInicialViniVeta from '../../image/img-pagina-inicial.png'
import logoperfil from '../../image/logo-perfil.png'
import luneta from '../../image/logo-search.png'
import { AutenticadoContexto } from "../../Contexts/authContexts";

export default function PaginaInicial() {

    const { verificarToken } = useContext(AutenticadoContexto)

    useEffect(() => {
        verificarToken()
    }, [verificarToken])
    

    return (
        <div className="box-screen-1024">
            <div className="box-pagina-inicial">
                <div className="box-logo-perfil">
                    <Link to='/perfil'>
                     <img src={logoperfil} alt="" />
                    <p>Perfil</p>
                    </Link>
                </div>
                <div className="box-pesquisar-minhaLista">
                    <div className="box-pesquisar">
                        <Link to='/pesquisar'>
                            <p>Pesquisar</p>
                            <img src={luneta} alt="" />
                        </Link>
                    </div>
                    <div className="box-minha-lista">
                        <Link to='/minhaLista'>
                            <p>Minha Lista</p>
                        </Link>
                    </div>
                </div> 
            </div>
             <div className="box-imagem-pagina-inicial">
                <img src={paginaInicialViniVeta} alt="taça de vinho e uma garrafa de vinho como logo da pagina inicial" />
             </div>
        </div>
    )
}