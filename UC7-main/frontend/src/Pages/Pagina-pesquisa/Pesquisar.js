import React from "react";
import "./pesquisar.scss";
import Search from "../../Components/Pesquisar/search";
import Footer from "../../Components/Footer/Footer";

export default function Pesquisa() {
  return (
    <div>
      <div className="box-search-background">
        <Search />
        <Footer />
      </div>
    </div>
  );
}
