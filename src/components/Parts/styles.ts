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
  margin-left: 8px;
  cursor: pointer;
  transform: rotate(90deg);
  margin-left: 120px;
  padding: 24px;
  z-index: 10;
  ${({ isLast }) =>
    isLast &&
    `border: 2px solid green;
  box-shadow: 0 0 5px green, 0 0 10px green, 0 0 20px green, 0 0 40px green,
    0 0 80px green;`}
`;

export const Line = styled.div`
  height: 2px;
  width: 100px;
  background: #fff;
  margin: 16px 0px;
`;

export const Circle = styled.div`
  height: 20px;
  width: 20px;
  background: #fff;
  border-radius: 50%;
  box-shadow: inset 5px 0 5px rgba(0, 0, 0, 0.5);
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
