import React, { useState } from "react";
import styled from "styled-components";
import api from "../../services/api"; // Importa API do backend

const NovaVaga = () => {
  // 🎯 Estado para armazenar os dados do formulário
  const [vaga, setVaga] = useState({
    titulo: "",
    localizacao: "",
    beneficios: "",
    link_formulario: "",
    responsabilidades: "",
    requisitos: "",
  });

  const [mensagem, setMensagem] = useState(null);

  // 🔹 Atualizar o estado ao preencher o formulário
  const handleChange = (e) => {
    setVaga({ ...vaga, [e.target.name]: e.target.value });
  };

  // 🔥 Enviar os dados da vaga para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post("/", {
        ...vaga,
        responsabilidades: vaga.responsabilidades.split("\n"), // Convertendo string em array
        requisitos: vaga.requisitos.split("\n"),
      });

      console.log("📢 Vaga cadastrada com sucesso:", response.data);
      setMensagem("Vaga cadastrada com sucesso!");
      setVaga({ titulo: "", localizacao: "", beneficios: "", link_formulario: "", responsabilidades: "", requisitos: "" });
    } catch (error) {
      console.error("❌ Erro ao cadastrar a vaga:", error);
      setMensagem("Erro ao cadastrar a vaga.");
    }
  };

  return (
    <Wrapper>
      <h1>Cadastro de Nova Vaga</h1>
      {mensagem && <Mensagem>{mensagem}</Mensagem>}
      <Form onSubmit={handleSubmit}>
        <Label>Título da Vaga</Label>
        <Input type="text" name="titulo" value={vaga.titulo} onChange={handleChange} required />

        <Label>Localização</Label>
        <Input type="text" name="localizacao" value={vaga.localizacao} onChange={handleChange} required />

        <Label>Benefícios</Label>
        <Input type="text" name="beneficios" value={vaga.beneficios} onChange={handleChange} required />

        <Label>Link do Formulário</Label>
        <Input type="text" name="link_formulario" value={vaga.link_formulario} onChange={handleChange} required />

        <Label>Responsabilidades (Separe por linha)</Label>
        <Textarea name="responsabilidades" value={vaga.responsabilidades} onChange={handleChange} required />

        <Label>Requisitos (Separe por linha)</Label>
        <Textarea name="requisitos" value={vaga.requisitos} onChange={handleChange} required />

        <Button type="submit">Cadastrar Vaga</Button>
      </Form>
    </Wrapper>
  );
};

// 🎨 Estilização com Styled Components
const Wrapper = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 10px 0 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 80px;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const Mensagem = styled.p`
  background: #eaf5ea;
  color: #155724;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 10px;
`;

export default NovaVaga;
