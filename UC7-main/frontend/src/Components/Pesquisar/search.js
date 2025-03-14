import React, { useState, useEffect } from "react";
import api from "../../services/api";
import search from "../../image/logo-search.png";
import cordero_malbec from "../../image/cordero-malbec.png";
import infoadd from "../../image/infoadd.png";
import { Link } from "react-router-dom";

export default function Search() {
 
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/data/vinhos.json");

        const filteredResults = response.data.filter(
          (vinho) =>
            vinho.nome.toLowerCase().includes(query.toLowerCase()) ||
            vinho.uva.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      } catch (error) {
        setError("Nenhum vinho encontrado.");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="box-search">
      <form>
        <div className="box-search-box-btn">
          <input
            type="search"
            placeholder="Pesquisar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <img src={search} alt="Pesquisar" />
          </button>
        </div>
      </form>

      <div className="box-search-resposta">
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}

        <ul className="results-list">
          {results.map((vinho) => (
            <li key={vinho.id}>
              <img src={cordero_malbec} alt="" />
              <div className="box-vinho">
                <p>{vinho.nome}</p>
                <p>750ml</p>
                <p>{vinho.uva}</p>
                <div className="box-vinho-info-add">
                  <Link to={`/vinhoInformacoes/${vinho.id}`}>
                    <img src={infoadd} alt="informações adicionais" />
                    <p>Mais informações</p>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
