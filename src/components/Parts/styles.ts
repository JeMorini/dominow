import styled from "styled-components";

interface ContainerNumberProps {
  justifyContent: "center" | "space-between";
}

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
  cursor: pointer;
`;

export const Line = styled.div`
  height: 2px;
  width: 100px;
  background: #fff;
  margin: 16px 0px;
`;

export const Circle = styled.div`
  height: 15px;
  width: 15px;
  background: #fff;
  border-radius: 50%;
`;

export const ContainerNumber = styled.div<ContainerNumberProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  width: 100%;
  height: 80px;
  flex-direction: column;
`;
