import React, { useState, useEffect, useContext } from "react";
import { AutenticadoContexto } from "../../Contexts/authContexts";
import { Link } from "react-router-dom";
import apiLocal from "../../services/api"
import { toast } from "react-toastify";
import fotoPerfil from '../../image/foto-perfil.png';

export default function UsuariosInfo() {
    const [dadosUsuarios, setDadosUsuarios] = useState(null);
    const { usuarioId } = useContext(AutenticadoContexto);


    useEffect(() => {
        async function consultarDadosUsuarios() {
            try {
                const resposta = await apiLocal.get(`/ConsultarUsuariosUnico/${usuarioId}`);

                setDadosUsuarios(resposta.data);
            } catch (err) {
                toast.error('Erro ao Comunicar com BackEnd', { toastId: 'ToastId' });
            }
        }

        consultarDadosUsuarios();
    }, [usuarioId]);

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
        <div>
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
                <ul className="box-perfil-lista">
                    <li><p>E-mail: {dadosUsuarios.email}</p></li>
                    <li><p>Idade: {dadosUsuarios.idade || "Não informada"}</p></li>
                    <li><p>Gênero: {dadosUsuarios.genero}</p></li>
                    <li><p>Membro desde: {dataFormatada}</p></li>
                </ul>

                <div className="box-perfil-button-voltar-editar">
                    <button><Link to={`/EditarUsuarios/${usuarioId}`}><p>Editar</p></Link></button>
                </div>
            </div>


        </div>
    );
}
