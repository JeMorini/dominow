"use client";
import { useEffect, useState, useRef } from "react";
import { Container } from "./styles";

export default function ValidateScreen({ message }: any) {
  return (
    <Container>
      <img src="/logo_white.png" />

      <p style={{ color: "white", fontSize: 32, textAlign: "center" }}>
        {message ||
          "Utilize um computador ou uma tela maior para a mesa e os celulares para as peças"}
      </p>
    </Container>
  );
}
