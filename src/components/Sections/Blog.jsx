import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BlogBox from "../Elements/BlogBox";
import FullButton from "../Buttons/FullButton";
import Popup from "../Elements/Popup";
import api from "../../services/api"; // Importa API do backend

const Blog = () => {
  const [vagas, setVagas] = useState([]); // Removendo os tipos <Vaga[]>
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Buscar vagas na API
  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await api.get("/");
        setVagas(response.data);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVagas();
  }, []);

  // Abrir o popup com detalhes da vaga
  const openPopup = async (jobId) => {
    try {
      console.log(`📢 Buscando detalhes da vaga ID: ${jobId}`); // Debug para verificar o ID recebido
  
      if (!jobId) {
        console.error("❌ ID da vaga inválido!");
        return;
      }
  
      const response = await api.get(`/${jobId}`); // 🔥 Buscar detalhes completos da vaga
      console.log("📢 Detalhes completos da vaga recebidos no frontend:", response.data); // Debug
  
      setSelectedJob(response.data);
      setPopupVisible(true);
    } catch (error) {
      console.error("❌ Erro ao buscar detalhes da vaga:", error);
    }
  };

  // Fechar popup
  const closePopup = () => {
    setPopupVisible(false);
    setSelectedJob(null);
  };

  

  return (
    <Wrapper id="blog">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Vagas na Verginia</h1>
            <p className="font13">
              Encontre a sua próxima oportunidade profissional conosco!
            </p>
          </HeaderInfo>

          {loading ? (
            <p>Carregando vagas...</p>
          ) : vagas.length > 0 ? (
            <GridContainer>
            {vagas.map((vaga) => (
                  <BlogBox
                    key={vaga.id}
                    title={vaga.titulo}
                    text={vaga.localizacao}
                    tag="Candidatar-se"
                    author="Saiba mais"
                    action={() => openPopup(vaga.id)} // 🔥 Agora passa apenas o ID corretamente
                  />
                ))}
                            </GridContainer>
          ) : (
            <p>Nenhuma vaga disponível no momento.</p>
          )}

          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton title="Ver mais" action={() => alert("clicked")} />
            </div>
          </div>
        </div>
      </div>

{popupVisible && selectedJob && (
  <Popup onClose={closePopup}>
    <h2>{selectedJob.titulo}</h2>
    <p>{selectedJob.localizacao}</p>

    <h3>Responsabilidades</h3>
    <ul>
      {selectedJob.responsabilidades && selectedJob.responsabilidades.length > 0 ? (
        selectedJob.responsabilidades.map((resp, idx) => (
          <li key={idx}>{resp}</li>
        ))
      ) : (
        <li>Não informado</li>
      )}
    </ul>

    <h3>Requisitos</h3>
    <ul>
      {selectedJob.requisitos && selectedJob.requisitos.length > 0 ? (
        selectedJob.requisitos.map((req, idx) => (
          <li key={idx}>{req}</li>
        ))
      ) : (
        <li>Não informado</li>
      )}
    </ul>

  </Popup>


      )}
    </Wrapper>
  );
};

// 🎨 Estilos com Styled Components
const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
`;

const HeaderInfo = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const Button = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background: ${(props) => props.color || "#007BFF"};
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default Blog;
