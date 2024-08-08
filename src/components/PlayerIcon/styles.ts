import styled from "styled-components";

export const Container = styled.div`
  z-index: 10;
  background: ${({ color }) => color};
  height: 100px;
  width: 100px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
