"use client";
import { useEffect, useState, useRef } from "react";
import { Container, Logo, WinnerText } from "./styles";
import PlayerIcon from "../PlayerIcon";

export default function WinnerMessage({ player }: any) {
  return (
    <Container>
      <PlayerIcon color={player === "1" ? "red" : "green"} player={player} />
      <WinnerText>Jogador {player} venceu!</WinnerText>
    </Container>
  );
}
