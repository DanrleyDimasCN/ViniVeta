import React from "react";
import { Link } from "react-router-dom";
import "./pesquisar.scss";
import Search from "../../Components/Pesquisar/search";

export default function Pesquisa() {
  return (
    <div>
      <div className="box-search-background">
        <Search />
      </div>
      <div class="box-button-voltar">
          <Link to="/paginaInicial">
            <p>Voltar</p>
          </Link>
      </div>
    </div>
  );
}
