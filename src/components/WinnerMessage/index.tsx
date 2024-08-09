"use client";
import { useEffect, useState, useRef } from "react";
import { Container, WinnerText } from "./styles";
import PlayerIcon from "../PlayerIcon";

export default function WinnerMessage({ player, message }: any) {
  return (
    <Container>
      <PlayerIcon color={player === "1" ? "red" : "orange"} player={player} />
      <WinnerText>{message}</WinnerText>
    </Container>
  );
}
