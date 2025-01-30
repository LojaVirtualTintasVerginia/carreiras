import React, { useEffect, useState } from "react";
import api from "../../services/api";
import styled from "styled-components";

export default function GerenciarVagas() {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await api.get("/");
        setVagas(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar vagas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVagas();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta vaga?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/${id}`);
      alert("✅ Vaga deletada com sucesso!");
      setVagas(vagas.filter(vaga => vaga.id !== id));
    } catch (error) {
      console.error("❌ Erro ao deletar vaga:", error);
      alert("Erro ao deletar a vaga.");
    }
  };

  return (
    <Wrapper>
      <Header>
        <h1>🛠️ Gerenciar Vagas</h1>
        <p>Aqui você pode visualizar e deletar vagas cadastradas.</p>
      </Header>

      {loading ? (
        <LoadingMessage>Carregando vagas...</LoadingMessage>
      ) : vagas.length === 0 ? (
        <NoDataMessage>❌ Nenhuma vaga disponível.</NoDataMessage>
      ) : (
        <CardGrid>
          {vagas.map((vaga) => (
            <Card key={vaga.id}>
              <CardHeader>
                <h3>{vaga.titulo}</h3>
                <span>{vaga.localizacao}</span>
              </CardHeader>
              <DeleteButton onClick={() => handleDelete(vaga.id)}>🗑️ Excluir</DeleteButton>
            </Card>
          ))}
        </CardGrid>
      )}
    </Wrapper>
  );
}

// ✅ Estilização com Styled Components
const Wrapper = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 32px;
    font-weight: 700;
    color: #1d1d1f;
  }

  p {
    font-size: 16px;
    color: #6e6e73;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #6e6e73;
`;

const NoDataMessage = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #d9534f;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  h3 {
    font-size: 20px;
    font-weight: bold;
    color: #1d1d1f;
    margin-bottom: 5px;
  }

  span {
    font-size: 14px;
    color: #6e6e73;
  }
`;

const DeleteButton = styled.button`
  background: #ff3b30;
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #cc2c24;
  }
`;
