import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background: #2e4068;
  padding: 32px;
`;

export const ContainerQrCodeLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 50%;
`;

export const ContainerQrCode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  padding: 32px 48px;
`;

export const TitlePlayer = styled.p`
  font-size: 24px;
  font-weight: 600;
  z-index: 10;
`;

export const TitleStatus = styled.p`
  font-size: 16px;
`;

export const TitleVs = styled.p`
  color: #fff;
  font-size: 32px;
`;

export const SubTitle = styled.p`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
`;

export const ButtonUrl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background: #018780;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
`;

export const TitleButtonUrl = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

export const ContainerGame = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
  background: #2e4068;
  padding: 32px;
  box-sizing: border-box;
  /* background-image: radial-gradient(#f1aa41, #b71608, #a30a08); */
`;

export const ScrollableDiv = styled.div`
  width: 100%; /* Defina a largura desejada */
  height: 300px; /* Defina a altura desejada */
  background: #f0f0f0;
  overflow-x: auto; /* Adiciona o scroll horizontal */
  overflow-y: hidden; /* Esconde o scroll vertical, se necessário */
  white-space: nowrap; /* Impede a quebra de linha para garantir que o conteúdo role horizontalmente */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2e4068;
  padding: 80px;
  box-sizing: border-box;
  /* Para navegadores baseados em WebKit (Chrome, Safari) */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Para Firefox */
  scrollbar-width: none;

  /* Para IE e Edge */
  -ms-overflow-style: none;

  /* Suporte futuro para esconder barra de rolagem */
  scrollbar-gutter: stable both-edges;
`;

export const Table = styled.div`
  position: absolute;
  background: #e3e0b3;
  height: 100px;
  width: 60%;
  z-index: 0;
  display: flex;
  align-items: left;
  padding: 8px;
  ${({ isSelected }) =>
    isSelected &&
    `
    border: 2px solid green;
  box-shadow: 0 0 5px green, 0 0 10px green, 0 0 20px green, 0 0 40px green,
    0 0 80px green;
  `}

  ${({ bottom }) =>
    bottom
      ? `
    bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  `
      : `top: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;`};
`;
