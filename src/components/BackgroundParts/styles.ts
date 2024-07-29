import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100px;
  width: 50px;
  ${({ color }) => `
  background: linear-gradient(135deg, ${color} 50%, #000 50%);
  `}
  border-radius: 8px;
  padding: 10px;
  margin-left: 16px;
  box-shadow: 10px 10px 20px #000;
  z-index: 10;
`;

export const Logo = styled.img`
  transform: rotate(45deg);
  width: 100px;
`;
