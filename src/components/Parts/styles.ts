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
  background: #242124;
  border-radius: 24px;
  padding: 24px;
  margin-left: 8px;
  cursor: pointer;
  z-index: 10;
  ${({ isLast }) =>
    isLast &&
    `border: 2px solid green;
  box-shadow: 0 0 5px green, 0 0 10px green, 0 0 20px green, 0 0 40px green,
    0 0 80px green;`}
  ${({ rotation }) =>
    rotation !== undefined &&
    `transform: ${
      rotation === "0"
        ? "none"
        : rotation === "1"
        ? "rotate(90deg)"
        : "rotate(270deg)"
    };
    margin-left: ${rotation === "0" ? 80 : 120}px;
    margin-right: ${rotation === "0" && -40}px;

    `}
    @media (max-width: 1000px) {
    height: 112px;
    width: 56px;
  }
`;

export const Line = styled.div`
  height: 2px;
  width: 100px;
  background: #fff;
  margin: 16px 0px;
  @media (max-width: 1000px) {
    width: 80px;
  }
`;

export const Circle = styled.div`
  height: 16px;
  width: 16px;
  background: #fff;
  border-radius: 50%;
  box-shadow: inset 5px 0 5px rgba(0, 0, 0, 0.5);

  @media (max-width: 1000px) {
    height: 10px;
    width: 10px;
  }
`;

export const ContainerNumber = styled.div<ContainerNumberProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  width: 100%;
  height: 80px;
  /* background: red; */
  flex-direction: column;
  @media (max-width: 1000px) {
    height: 100px;
  }
`;
