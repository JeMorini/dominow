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
  const peerInstance = useRef<any>(null);
  const [peerId, setPeerId] = useState("");
  const [url, setUrl] = useState("");
  const [connectedPeerOne, setConnectedPeerOne] = useState<Object | null>();
  const [connectedPeerTwo, setConnectedPeerTwo] = useState<Object | null>();

  useEffect(() => {
    const myPeer = new Peer();

    myPeer.on("open", (id) => {
      console.log("My peer ID:", id);
      setPeerId(id);
      setUrl(`http://localhost:3000/deck/${id}`);
    });

    myPeer.on("connection", (connection) => {
      console.log("Connection established with:", connection.peer);

      connection.on("data", (data: any) => {
        console.log(data.player);
        console.log(data.player === "2");
        const conn = myPeer.connect(`${data.peerId}`);

        conn.on("open", () => {
          if (data.player === "1") {
            setConnectedPeerOne(data);
          }

          if (data.player === "2") {
            setConnectedPeerTwo(data);
          }
          conn.send(generateRandomPairs());
        });
      });
    });

    peerInstance.current = myPeer;

    return () => myPeer.destroy();
  }, []);

  function generateRandomPairs() {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const firstNumber = Math.floor(Math.random() * 7).toString();
      const secondNumber = Math.floor(Math.random() * 7).toString();
      result.push([firstNumber, secondNumber]);
    }
    return result;
  }

  const copyToClipboard = (player: string) => {
    navigator.clipboard.writeText(url + `?player=${player}`);
  };

  return (
    <Container>
      <img src="/logo_white.png" />
      <SubTitle>Conecte-se ao jogo</SubTitle>
      <ContainerQrCodeLine>
        <ContainerQrCode>
          <TitlePlayer>Jogador 1</TitlePlayer>
          <TitleStatus>
            Status: {connectedPeerOne ? `Conectado` : `Desconectado`}
          </TitleStatus>
          <QRCodeSVG value={url + `?player=1`} />
          <TitlePlayer>Ou</TitlePlayer>
          <ButtonUrl onClick={() => copyToClipboard("1")}>
            <FaCopy size={20} color="#fff" />
            <TitleButtonUrl>Copiar URL</TitleButtonUrl>
          </ButtonUrl>
        </ContainerQrCode>
        <TitleVs>Vs</TitleVs>
        <ContainerQrCode>
          <TitlePlayer>Jogador 2</TitlePlayer>
          <TitleStatus>
            Status: {connectedPeerTwo ? `Conectado` : `Desconectado`}
          </TitleStatus>
          <QRCodeSVG value={url + `?player=2`} />
          <TitlePlayer>Ou</TitlePlayer>
          <ButtonUrl onClick={() => copyToClipboard("2")}>
            <FaCopy size={20} color="#fff" />
            <TitleButtonUrl>Copiar URL</TitleButtonUrl>
          </ButtonUrl>
        </ContainerQrCode>
      </ContainerQrCodeLine>
    </Container>
  );
}
