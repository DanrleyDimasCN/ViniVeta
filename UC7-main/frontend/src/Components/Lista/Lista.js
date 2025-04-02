import React, { useState, useEffect, useContext } from "react";
import { AutenticadoContexto } from "../../Contexts/authContexts";
import api from "../../services/api";
import star from '../../image/star.png'
import search from "../../image/logo-search.png";
import cordero_malbec from "../../image/cordero-malbec.png";
import infoadd_white from "../../image/infoadd_white.png";
import { Link } from "react-router-dom";

export default function Lista() {
    const [query, setQuery] = useState("");
    const [listas, setListas] = useState([]);
    const [error, setError] = useState("");
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [vinhoParaEditar, setVinhoParaEditar] = useState(null);
    const { usuarioId } = useContext(AutenticadoContexto);
    
    async function consultarLista() {
        try {
            const response = await api.get(`/ConsultarLista/${usuarioId}`);
            setListas(response.data);
        } catch (error) {
            setError("Nenhum vinho encontrado.");
        }
    }

    useEffect(() => {
        if (usuarioId) {
            consultarLista();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, usuarioId]);

    const filteredVinhos = listas.flatMap(lista =>
        lista.vinhos.map(listaVinho => ({
            ...listaVinho.vinho,
            comentario: listaVinho.comentario,
            minha_nota: listaVinho.minha_nota,
        })).filter(vinho =>
            vinho.nome.toLowerCase().includes(query.toLowerCase()) ||
            vinho.uva.toLowerCase().includes(query.toLowerCase())
        )
    );

    const abrirModalEditar = (vinho) => {
        setVinhoParaEditar(vinho);
        setModalEditarAberto(true);
    };

    const fecharModalEditar = () => {
        setModalEditarAberto(false);
        setVinhoParaEditar(null);
    };

    const handleEditarVinho = (dadosEditados) => {
        console.log("Dados editados:", dadosEditados);
        fecharModalEditar();
        
    };

    const handleApagarVinho = async (vinhoId) => {
        if (window.confirm("Tem certeza que deseja apagar este vinho da sua lista?")) {
            try {
                const listaDoVinho = listas.find(lista =>
                    lista.vinhos.some(lv => lv.vinho.id === vinhoId)
                );

                if (listaDoVinho) {
                    await api.delete(`/ListaVinhos/${listaDoVinho.id}/${vinhoId}`);
                    alert("Vinho removido com sucesso!");
                    consultarLista();
                } else {
                    setError("Erro ao encontrar o vinho na sua lista.");
                }
            } catch (error) {
                setError("Erro ao apagar o vinho.");
                console.error("Erro ao apagar o vinho:", error);
            }
        }
    };

    return (
        <div className="box-lista">
            <div className="box-lista-search">
                <form>
                    <div className="box-search-pesquisa">
                        <input
                            type="search"
                            placeholder="Procurar (Nome, Uva...)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit">
                            <img src={search} alt="Pesquisar" />
                        </button>
                    </div>
                </form>
            </div>

            <div className="box-lista-resposta">
                {error && <p>{error}</p>}

                <ul className="box-resposta-ul">
                    {filteredVinhos.map((vinho) => (
                        <li key={vinho.id}>
                            <div className="box-resposta-editar">
                                <img src={cordero_malbec} alt="" />
                                <button onClick={() => abrirModalEditar(vinho)}>Editar</button>
                            </div>
                            <div className="box-resposta-nome">
                                <p>{vinho.nome} 750ml</p>
                                <p>{vinho.uva}</p>
                                <div className="box-resposta-info">
                                    <Link to={`/vinhoInformacoes/${vinho.id}`}>
                                        <img src={infoadd_white} alt="informações adicionais" />
                                        Mais informações
                                          {vinho.comentario}
                                    </Link>
                                  
                                    <div className="box-resposta-nota">
                                        <img src={star} alt="" />
                                        <p>{vinho.nota_media}</p>
                                        
                                    </div>
                                     
                                </div>
                            </div>
                          
                        </li>
                    ))}
                </ul>
                {modalEditarAberto && vinhoParaEditar && (
                    <div className="modal-overlay">
                        <div className="modal-editar">
                            <h3>Editar/Apagar Vinho</h3>
                            <div className="modal-buttons">
                                <button onClick={fecharModalEditar}>Cancelar</button>
                                <button onClick={() => handleEditarVinho({ id: vinhoParaEditar.id, vinho: 'Novo Nome', uva: 'Nova Uva' })}>
                                    Salvar Edições
                                </button>
                                <button className="button-apagar" onClick={() => handleApagarVinho(vinhoParaEditar.id)}>
                                    Apagar Vinho
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}