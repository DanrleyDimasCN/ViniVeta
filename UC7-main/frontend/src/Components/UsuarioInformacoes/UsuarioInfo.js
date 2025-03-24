import React, { useState, useEffect, useContext } from "react";
import { AutenticadoContexto } from "../../Contexts/authContexts";
import { Link } from "react-router-dom";
import apiLocal from "../../services/api"
import { toast } from "react-toastify";
import fotoPerfil from '../../image/foto-perfil.png';

export default function UsuariosInfo() {
    const { verificarToken } = useContext(AutenticadoContexto);
    const [dadosUsuarios, setDadosUsuarios] = useState(null);
  
    useEffect(() => {
        verificarToken();
    }, [verificarToken]);

    useEffect(() => {
        async function consultarDadosUsuarios() {
            try {
                const token = JSON.parse(localStorage.getItem('@token'));

                const resposta = await apiLocal.post('/ConsultarUsuariosUnico', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDadosUsuarios(resposta.data);
            } catch (err) {
                toast.error('Erro ao Comunicar com BackEnd', { toastId: 'ToastId' });
            }
        }

        consultarDadosUsuarios();
    }, []);
   
    if (!dadosUsuarios) {
        return <p>Carregando...</p>;
    }

    const data = new Date(dadosUsuarios.create_at);
    const dataFormatada = data.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="box-perfil-background">
            <div className="box-perfil-principal">
                <div className="box-perfil">
                    <div className="box-perfil-foto">
                        <img src={fotoPerfil} alt="Foto de perfil" />
                    </div>
                    <div className="box-perfil-nome">
                        <h2>{dadosUsuarios.nome}</h2>
                        <p>{dadosUsuarios.sobrenome}</p>
                    </div>
                </div>
            </div>
            <div className="box-perfil-dados">
                <ul className="box-perfil-lista">
                    <li><p>E-mail: {dadosUsuarios.email}</p></li>
                    <li><p>Idade: {dadosUsuarios.idade || "Não informada"}</p></li>
                    <li><p>Gênero: {dadosUsuarios.genero}</p></li>
                    <li><p>Membro desde: {dataFormatada}</p></li>
                </ul>
            </div>
            <div className="box-perfil-button-voltar-editar">
                <button><Link to={`/EditarUsuarios/${dadosUsuarios.id}`}><p>Editar</p></Link></button>
            </div>
        </div>
    );
}
