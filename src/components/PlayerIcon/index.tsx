"use client";
import { useEffect, useState, useRef } from "react";
import { Container } from "./styles";

export default function PlayerIcon({ color, player }: any) {
  return (
    <Container color={color}>
      <h1 style={{ color: "white", fontSize: 40 }}>{player}</h1>
    </Container>
  );
}
