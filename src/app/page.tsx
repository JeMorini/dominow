"use client";
import React, { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Container,
  ContainerQrCodeLine,
  ContainerQrCode,
  TitlePlayer,
  TitleStatus,
  TitleVs,
  SubTitle,
  ButtonUrl,
  TitleButtonUrl,
} from "./styles";
import { FaCopy } from "react-icons/fa";
import { Peer } from "peerjs";

export default function Home() {
  const peerInstance = useRef(null);
  const [peerId, setPeerId] = useState("");
  const [url, setUrl] = useState("");
  const [connectedPeerIds, setConnectedPeerIds] = useState<any>([]);

  useEffect(() => {
    const myPeer = new Peer();

    myPeer.on("open", (id) => {
      console.log("My peer ID:", id);
      setPeerId(id);
      setUrl(`http://localhost:3000/deck/${id}`);
    });

    myPeer.on("connection", (connection) => {
      console.log("Connection established with:", connection.peer);
      setConnectedPeerIds((prev) => [...prev, connection.peer]);

      connection.on("data", (data) => {
        console.log(data);
        const conn = myPeer.connect(`${data}`);

        conn.on("open", () => {
          conn.send("hi!");
        });
      });
    });

    peerInstance.current = myPeer;

    return () => myPeer.destroy();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Container>
      <img src="/logo_white.png" />
      <SubTitle>Conecte-se ao jogo</SubTitle>
      <ContainerQrCodeLine>
        <ContainerQrCode>
          <TitlePlayer>Jogador 1</TitlePlayer>
          <TitleStatus>
            Status: {connectedPeerIds[0] ? `Conectado` : `Desconectado`}
          </TitleStatus>
          <QRCodeSVG value={url} />
          <TitlePlayer>Ou</TitlePlayer>
          <ButtonUrl onClick={copyToClipboard}>
            <FaCopy size={20} color="#fff" />
            <TitleButtonUrl>Copiar URL</TitleButtonUrl>
          </ButtonUrl>
        </ContainerQrCode>
        <TitleVs>Vs</TitleVs>
        <ContainerQrCode>
          <TitlePlayer>Jogador 2</TitlePlayer>
          <TitleStatus>
            Status: {connectedPeerIds[1] ? `Conectado` : `Desconectado`}
          </TitleStatus>
          <QRCodeSVG value={url} />
          <TitlePlayer>Ou</TitlePlayer>
          <ButtonUrl onClick={copyToClipboard}>
            <FaCopy size={20} color="#fff" />
            <TitleButtonUrl>Copiar URL</TitleButtonUrl>
          </ButtonUrl>
        </ContainerQrCode>
      </ContainerQrCodeLine>
    </Container>
  );
}
