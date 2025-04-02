import React from "react";
import Lista from "../../Components/Lista/Lista";
import './minhalista.scss'
import Footer from "../../Components/Footer/Footer";

export default function MinhaLista() {
  return (
    <div className="box-perfil-background">
        <Lista/>
        <Footer/>
    </div>
  )
}