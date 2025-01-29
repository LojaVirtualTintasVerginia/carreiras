import React, { useState } from "react";
import styled from "styled-components";
import BlogBox from "../Elements/BlogBox";
import FullButton from "../Buttons/FullButton";
import Popup from "../Elements/Popup"; // Importe o componente Popup

export default function Blog() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const openPopup = (job) => {
    setSelectedJob(job);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedJob(null);
  };

  const jobs = [
    {
      title: "VENDEDOR(A)",
      location: "Av. Ver. Toaldo Túlio, 2185 - Santa Felicidade, Curitiba - PR",
      responsibilities: [
        "Atingir metas de vendas, margem, serviços financeiros e telemarketing, aplicando a política comercial da empresa em seu dia-a-dia;",
        "Realizar operações de caixa;",
        "Conhecer com profundidade o mercado onde atua e os produtos que comercializa;",
        "Encantar e servir aos clientes de forma personalizada e consultiva (desde abordagem, demonstração de produto, negociação, pagamento e entrega do produto);",
        "Atuar na arrumação e organização dos setores e limpeza dos produtos e expositores;",
        "Conduzir o processo de atendimento ao cliente, realizar o cartazamento dos setores e operar os sistemas necessários;",
        "Contribuir com atividades de todos os setores da loja, objetivando o atingimento das metas globais da loja.",
      ],
      requirements: [
        "Ensino Médio Completo;",
        "Disponibilidade para trabalhar aos finais de semana (escala 6x1);",
        "Maiores de 18 anos;",
        "Disponibilidade de horário;",
      ],
    },
    {
      title: "AUXILIAR ADMINISTRATIVO",
      location: "Rua XV de Novembro, 123 - Centro, Curitiba - PR",
      responsibilities: [
        "Realizar atividades administrativas diversas;",
        "Auxiliar no controle e organização de documentos e arquivos;",
        "Atendimento a clientes e fornecedores via telefone e e-mail;",
        "Apoiar na elaboração de relatórios e planilhas;",
        "Organizar agenda e compromissos do setor administrativo;",
        "Realizar lançamentos no sistema e auxiliar na rotina financeira e contábil;",
      ],
      requirements: [
        "Ensino Médio Completo (Superior em Administração será um diferencial);",
        "Boa comunicação verbal e escrita;",
        "Conhecimento em Pacote Office;",
        "Organização e atenção aos detalhes;",
        "Disponibilidade para trabalhar em horário comercial;",
      ],
    },
  ];

  return (
    <Wrapper id="blog">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Vagas na Verginia</h1>
            <p className="font13">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
              <br />
              labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            {jobs.map((job, index) => (
              <div key={index} className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <BlogBox
                  title={job.title}
                  text={job.location}
                  tag="Candidatar-se"
                  author="Saiba mais"
                  action={() => openPopup(job)}
                />
              </div>
            ))}
          </div>
          
          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton title="Ver mais" action={() => alert("clicked")} />
            </div>
          </div>
        </div>
      </div>

      {popupVisible && selectedJob && (
        <Popup onClose={closePopup}>
          <h2>{selectedJob.title}</h2>
          <p>{selectedJob.location}</p>
          <h3>Responsabilidades</h3>
          <ul>
            {selectedJob.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
          <h3>Requisitos</h3>
          <ul>
            {selectedJob.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </Popup>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;