import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "../Pages/Inicio/Inicio";
import Cadastro from "../Pages/Registro/Cadastro";

export default function NAutenticado() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="*" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
}
