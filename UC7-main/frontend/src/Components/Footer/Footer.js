import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../Footer/Footer.scss';
import fotoPerfil from '../../image/logo-perfil.png';
import fotoLista from '../../image/infoadd_white.png';
import fotoSearch from '../../image/logo-search.png';
import fotoHome from '../../image/home.png'

export default function Footer() {
    const location = useLocation();

    return (
        <div>
            <div className="box-footer">
                {location.pathname === '/Perfil' ? (
                    <Link to="/">
                        <img src={fotoHome} alt="" />
                        <p>Início</p>
                    </Link>
                ) : (
                    <Link to="/Perfil">
                        <img src={fotoPerfil} alt="" />
                        <p>Perfil</p>
                    </Link>
                )}

                {location.pathname === '/minhaLista' ? (
                    <Link to="/">
                        <img src={fotoHome} alt="" />
                        <p>Início</p>
                    </Link>
                ) : (
                    <Link to="/minhaLista">
                        <img src={fotoLista} alt="" />
                        <p>Minha Lista</p>
                    </Link>
                )}

                {location.pathname === '/pesquisar' ? (
                    <Link to="/">
                        <img src={fotoHome} alt="" />
                        <p>Início</p>
                    </Link>
                ) : (
                    <Link to="/pesquisar">
                        <img src={fotoSearch} alt="" />
                        <p>Pesquisar</p>
                    </Link>
                )}
            </div>
        </div>
    );
}