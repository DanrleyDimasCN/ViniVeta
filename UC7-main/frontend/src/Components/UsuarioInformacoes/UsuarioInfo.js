import React, { useState, useEffect, useContext, useRef } from "react";
import { AutenticadoContexto } from "../../Contexts/authContexts";
import { useNavigate } from "react-router-dom";
import apiLocal from "../../services/api";
import { toast } from "react-toastify";
import fotoPerfil from '../../image/foto-perfil.png';

export default function UsuariosInfo() {
    const [dadosUsuarios, setDadosUsuarios] = useState(null);
    const [fotoUrl, setFotoUrl] = useState(fotoPerfil);
    const [novaFoto, setNovaFoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const { usuarioId } = useContext(AutenticadoContexto);
    const navigate = useNavigate();

    const objectUrlRef = useRef(null);

    useEffect(() => {
        async function consultarDadosUsuarios() {
            if (!usuarioId) return;

            setLoading(true);
            setError(null);
            try {
                const resposta = await apiLocal.get(`/ConsultarUsuariosUnico/${usuarioId}`);
                setDadosUsuarios(resposta.data);
                const bannerInicial = resposta.data?.banner;
                setFotoUrl(bannerInicial ? `http://localhost:3333/files/${bannerInicial}` : fotoPerfil);

            } catch (err) {
                console.error("Erro ao buscar dados do usuário:", err);
                toast.error('Erro ao buscar dados do usuário.');
                setError("Não foi possível carregar os dados do usuário.");
            } finally {
                setLoading(false);
            }
        }

        consultarDadosUsuarios();

        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }
        };
    }, [usuarioId]);

    const handleFotoPerfilChange = (event) => {
        const file = event.target.files[0];

        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }

        if (file && file.type.startsWith('image/')) {
            setNovaFoto(file);
            objectUrlRef.current = URL.createObjectURL(file);
            setFotoUrl(objectUrlRef.current);
        } else {
            setNovaFoto(null);
            setFotoUrl(dadosUsuarios?.banner ? `http://localhost:3333/files/${dadosUsuarios.banner}` : fotoPerfil); // Corrigido para usar a URL completa aqui também
            if (file) {
                toast.warn("Por favor, selecione um arquivo de imagem válido (jpeg, png, etc).");
            }
        }
    };

    const handleEnviarFotoPerfil = async (event) => {
        event.preventDefault();
        setError(null);

        if (!novaFoto) {
            toast.warn("Nenhuma nova foto selecionada para enviar.");
            setError("Selecione uma foto de perfil para enviar.");
            return;
        }

        const formData = new FormData();
        formData.append('file', novaFoto);

        setUploading(true);

        try {
            const resposta = await apiLocal.put(`/AlterarDadosUsuarios/${usuarioId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('API Response (Upload Success):', resposta.data);

            const novoNomeBanner = resposta.data.banner;

            if (!novoNomeBanner) {
                throw new Error("Resposta da API não incluiu o nome do banner atualizado.");
            }

            const novaUrlImagem = `http://localhost:3333/files/${novoNomeBanner}`;
            console.log('New image URL to set:', novaUrlImagem);

            setDadosUsuarios(prevDados => ({
                ...prevDados,
                banner: novoNomeBanner
            }));
            setFotoUrl(novaUrlImagem);

            setNovaFoto(null);
            toast.success("Foto de perfil atualizada com sucesso!");

            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }

        } catch (error) {
            console.error("Erro ao enviar foto:", error);
            toast.error("Erro ao enviar a foto de perfil. Verifique o console para detalhes.");
            setError("Erro ao enviar a foto de perfil.");
        } finally {
            setUploading(false);
            event.target.reset();
        }
    };

    if (loading) {
        return <p>Carregando dados do perfil...</p>;
    }

    if (error && !dadosUsuarios) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!dadosUsuarios) {
        return <p>Não foi possível carregar as informações do perfil.</p>;
    }

    const dataFormatada = dadosUsuarios.create_at ? new Date(dadosUsuarios.create_at).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }) : 'Data não disponível';

    return (
        <div>
            <div className="box-perfil-principal">
                <div className="box-perfil">
                    <div className="box-perfil-foto">
                        <img
                            src={fotoUrl}
                            alt="Foto de perfil"
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                            onError={(e) => {
                                console.warn(`Erro ao carregar imagem: ${fotoUrl}. Voltando para padrão.`);
                                e.target.src = fotoPerfil;
                            }}
                        />

                        <form onSubmit={handleEnviarFotoPerfil}>
                            <label htmlFor="upload-foto" className="botao-upload-foto">
                                {uploading ? "Enviando..." : "Selecionar Foto"}
                            </label>
                            <input
                                id="upload-foto"
                                type="file"
                                accept="image/*"
                                onChange={handleFotoPerfilChange}
                                style={{ display: 'none' }}
                                disabled={uploading}
                            />
                            {novaFoto && (
                                <button type="submit" className="botao-enviar-foto" disabled={uploading}>
                                    {uploading ? "Enviando..." : "Enviar Nova Foto"}
                                </button>
                            )}
                        </form>
                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    </div>

                    <div className="box-perfil-nome">
                        <h2>{dadosUsuarios.nome}</h2>
                        <p>{dadosUsuarios.sobrenome}</p>
                    </div>
                </div>

                <ul className="box-perfil-lista">
                    <li><p>E-mail: {dadosUsuarios.email}</p></li>
                    <li><p>Idade: {dadosUsuarios.idade ?? "Não informada"}</p></li>
                    <li><p>Gênero: {dadosUsuarios.genero}</p></li>
                    <li><p>Membro desde: {dataFormatada}</p></li>
                </ul>
                <div className="box-perfil-button-voltar-editar">
                    <button onClick={() => navigate(`/EditarUsuarios/${usuarioId}`)} disabled={uploading}>
                        Editar Perfil
                    </button>
                </div>
            </div>
        </div>
    );
}