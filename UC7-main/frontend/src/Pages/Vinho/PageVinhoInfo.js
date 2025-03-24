import React from "react";
import './vinhoInformacoes.scss'
import VinhoInfo from "../../Components/VinhoInfo/VinhoInfo";
import Footer from "../../Components/Footer/Footer";

export default function PageVinhoInfo() {
    return (
        <div className="box-vinhoInfo-background">
            <VinhoInfo/>
            <Footer/>
        </div>
    )
}