import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background: #2e4068;
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
`;
