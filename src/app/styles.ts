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
  box-sizing: border-box;
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
  padding: 32px 0px;
  box-sizing: border-box;
  background-image: radial-gradient(#4c6aae, #2e4068, #26375c);
`;

export const ScrollableDiv = styled.div<any>`
  width: 100%;
  height: 400px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: ${({ isScroll }) => (isScroll ? "center" : "flex-end")};
  background-color: transparent;
  padding-right: 50%;
  box-sizing: border-box;
  overflow-x: "auto";
  white-space: "nowrap";
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

export const Table = styled.div<any>`
  position: absolute;
  background: #e3e0b3;
  height: 100px;
  width: 60%;
  z-index: 0;
  display: flex;
  align-items: left;
  padding: 8px;
  ${({ isSelected, bottom }) =>
    isSelected &&
    `
    border: 2px solid ${bottom ? "orange" : "red"};
  box-shadow: 0 0 5px ${bottom ? "orange" : "red"}, 0 0 10px ${
      bottom ? "orange" : "red"
    }, 0 0 20px ${bottom ? "orange" : "red"}, 0 0 40px ${
      bottom ? "orange" : "red"
    },
    0 0 80px ${bottom ? "orange" : "red"};
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

export const Circle = styled.div`
  height: 16px;
  width: 16px;
  background: #fff;
  border-radius: 50%;
  box-shadow: inset 5px 0 5px rgba(0, 0, 0, 0.5);
`;

export const ContainerNumber = styled.div<ContainerNumberProps>`
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  width: 80px;
  height: 80px;
  background: #242124;
  padding: 16px;
  border-radius: 8px;
  flex-direction: column;
`;

export const TextPlus = styled.p`
  font-size: 64px;
  margin-left: 16px;
  font-weight: 500;
`;
