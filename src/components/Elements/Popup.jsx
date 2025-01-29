import React from "react";
import styled from "styled-components";

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const ApplyButton = styled.button`
  background:rgb(112, 228, 116);
  color: white;
  border: none;
  margin-left: 220px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Popup = ({ onClose, onApply, children }) => {
  return (
    <PopupWrapper>
      <PopupContent>
        {children}
        <CloseButton onClick={onClose}>Fechar</CloseButton>
        <ApplyButton onClick={onApply}>Candidatar-se</ApplyButton>
      </PopupContent>
    </PopupWrapper>
  );
};

export default Popup;