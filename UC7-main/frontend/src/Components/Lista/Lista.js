import React, { useState, useEffect } from "react";
import api from "../../services/api";
import search from "../../image/logo-search.png";
import cordero_malbec from "../../image/cordero-malbec.png";
import barril from "../../image/barril.png";
import uvas from "../../image/uvas.png";
import pais_regiao from "../../image/pais-regiao.png";
import star from "../../image/star.png";
import infoadd_white from "../../image/infoadd_white.png";
import { Link } from "react-router-dom";

export default function Lista() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function consultarLista() {
      try {
        const response = await api.get("/ConsultarLista");

        console.log("Resposta da API:", response); 
        console.log("Dados da API:", response.data); 

        const filteredResults = response.data.filter(
          (vinho) =>
            vinho.nome.toLowerCase().includes(query.toLowerCase()) ||
            vinho.uva.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      } catch (error) {
        setError("Nenhum vinho encontrado.");
      }
    }
    consultarLista();
  }, [query]);

  return (
    <div className="box-lista">
      <div className="box-lista-search">
        <form>
          <div className="box-search-pesquisa">
            <input
              type="search"
              
              placeholder="Procurar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">
              <img src={search} alt="Pesquisar" />
            </button>
          </div>
        </form>
      </div>

      <div className="box-filter">
        <button>
          <img src={uvas} alt="" />
          <p>Uvas</p>
        </button>
        <button>
          <img src={pais_regiao} alt="" />
          <p>País/Região</p>
        </button>
        <button>
          <img src={barril} alt="" />
          <p>Vinicola</p>
        </button>
      </div>

      <div className="box-lista-resposta">
        {error && <p>{error}</p>}

        <ul className="box-resposta-ul">
          {results.map((vinho) => (
            <li key={vinho.id}>
              <img src={cordero_malbec} alt="" />
              <div className="box-resposta-nome">
                <p>{vinho.nome} 750ml</p>
                <p>{vinho.tipo}</p>
                <p>{vinho.uva}</p>
                <div className="box-resposta-info">
                  <Link to={`/vinhoInformacoes/${vinho.id}`}>
                    <img src={infoadd_white} alt="informações adicionais" />
                    <p>Mais informações</p>
                  </Link>
                  <div className="box-resposta-nota">
                    <div className="box-nota-item">
                      <img src={star} alt="" />
                      <p>{vinho.nota}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
