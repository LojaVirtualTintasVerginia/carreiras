import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
// Screens
import Landing from "./screens/Landing";
import NovaVaga from "./components/Sections/NovaVaga"; // Importa a nova página
import GerenciarVagas from "./components/Sections/GerenciarVagas"; 

export default function App() {
  return (
    <Router>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/nova-vaga" element={<NovaVaga />} /> {/* 🔥 Nova rota */}
        <Route path="/gerenciar-vagas" element={<GerenciarVagas />} />
      </Routes>
    </Router>
  );
}
