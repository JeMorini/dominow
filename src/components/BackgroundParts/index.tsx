"use client";
import { useEffect, useState, useRef } from "react";
import { Container, Logo } from "./styles";

export default function BackgroundParts({ color }: any) {
  return (
    <Container color={color}>{/* <Logo src="/logo_white.png" /> */}</Container>
  );
}
