import React, { useState, useEffect, useContext } from "react";
import { AutenticadoContexto } from "../../Contexts/authContexts";
import cordero from "../../image/cordero-malbec.png";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function VinhoInfo() {
  const [infoVinho, setInfoVinho] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [nota, setNota] = useState(0);
  const [favorito, setFavorito] = useState(false);
  const { usuarioId } = useContext(AutenticadoContexto);

  const { id } = useParams();

  useEffect(() => {
    async function consultarVinho() {
      try {
        const response = await api.get(`/vinho/${id}`);
        
        if (response) {  
          setInfoVinho(response.data);
        } else {
          console.error("Vinho não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar informações do vinho:", error);
      }
    }

    if (id) {
      consultarVinho();
    }
  }, [id]);

  async function addVinho() {
    try {
      if (!usuarioId) {
        toast.error("Usuário não Autenticado");
        return;
      }

      await api.post(`/AdicionarVinho`, {
        usuarioId,
        nome: infoVinho.nome,
        tipo: infoVinho.tipo,
        uva: infoVinho.uva,
        pais: infoVinho.pais,
        regiao: infoVinho.regiao,
        descricao: infoVinho.descricao,
        nota_media: nota,
        favorito,
      });
    
      
      toast.success("Vinho Adicionado á sua lista", {
        toastId: "ToastId",
      });
        console.log("id do vinho " + id);
      setModalAberto(false);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao adicionar o vinho á sua lista", {
        toastId: "ToastId",
      });
    }
  }

  if (!infoVinho) return <p>Carregando...</p>;

  return (
    <div className="box-vinhoInfo-principal">
      <div className="box-vinhoInfo">
        <img src={cordero} alt="Foto do vinho" />
        <h2>
          <div className="box-vinhoInfo-nome">
            <p>{infoVinho.nome}</p>
            <p>{infoVinho.uva}</p>
            <p>750ml</p>
          </div>
        </h2>
      </div>
      <div className="box-vinhoInfo-button">
        <button onClick={() => setModalAberto(true)}>
          Adicionar á minha Lista
        </button>
      </div>
      <div className="box-vinho-informacao-completa">
        <p>Tipo: {infoVinho.tipo}</p>
        <p>Uva: {infoVinho.uva}</p>
        <p>País: {infoVinho.pais}</p>
        <p>Região: {infoVinho.regiao}</p>
        <p>Produtor: {infoVinho.produtor}</p>
        <p>Teor Alcoólico: {infoVinho.teor_alcoolico}</p>
        <p>Amadurecimento: {infoVinho.amadurecimento}</p>
        <p>Harmonização: {infoVinho.harmonizacao}</p>
        <p>Olfativo: {infoVinho.olfativo}</p>
        <p>Gustativo: {infoVinho.gustativo}</p>
        <p>Descrição: {infoVinho.descricao}</p>
        <p>Temperatura de Serviço: {infoVinho.temperatura_servico}</p>
        <p>Um pouco mais sobre o vinho</p>
        <div className="box-vinhoInfo-historia">
          <div className="box-vinho-historia">
            <p>{infoVinho.historia}</p>
          </div>
        </div>
      </div>
      {modalAberto && (
        <div className="box-modal">
          <div className="modal">
            <label>
              <p>NOTA:</p>
              <input
                type="number"
                value={nota}
                onChange={(e) => setNota(Number(e.target.value))}
                min="0"
                max="10"
              />
            </label>
            <label>
              <p>FAVORITO: </p>
              <input
                type="Checkbox"
                checked={favorito}
                onChange={(e) => setFavorito(e.target.checked)}
              />
            </label>
            <button onClick={addVinho}>Confirmar</button>
            <button onClick={() => setModalAberto(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
