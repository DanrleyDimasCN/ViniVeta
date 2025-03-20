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
    const pesquisarVinhos = async () => {
      if (query.length < 3) {
        setResults([]);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await api.get("/vinhos");
        const filteredResults = response.data.filter(
          (vinho) =>
            vinho.nome.toLowerCase().includes(query.toLowerCase()) ||
            vinho.uva.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredResults.length === 0) {
          setError("Nenhum vinho encontrado.");
        } else {
          setResults(filteredResults);
        }

      } catch (err) {
        setError("Erro ao buscar vinhos.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      pesquisarVinhos();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
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