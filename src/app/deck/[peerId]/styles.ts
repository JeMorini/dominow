import styled from "styled-components";

export const ContainerConnect = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background: #2e4068;
  margin: 0;
  padding: 0;
`;

export const ButtonConnect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background: #018780;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
`;

export const TitleButtonConnect = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

export const ContainerGame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background-image: radial-gradient(#4c6aae, #2e4068, #26375c);
  margin: 0;
  padding: 8px;
  transform-origin: center;
  box-sizing: border-box;
`;

export const ContainerParts = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  overflow-x: "auto";
  white-space: "nowrap";
  margin-top: 16px;
`;

export const ButtonGetPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background: #018780;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 8px;
  ${({ isSelected }) =>
    isSelected &&
    `
    border: 4px solid ${isSelected};`}
`;

export const TextButtonGetPart = styled.p`
  font-size: 16px;
  color: #fff;
  margin: 0;
  font-weight: 500;
  margin-left: 8px;
`;
