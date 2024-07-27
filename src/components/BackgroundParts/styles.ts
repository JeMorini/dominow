import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 200px;
  width: 100px;
  background: #000;
  border-radius: 8px;
  padding: 10px;
  margin-left: 16px;
  box-shadow: 10px 10px 20px #000;
`;

export const Logo = styled.img`
  transform: rotate(45deg);
  width: 100px;
`;
