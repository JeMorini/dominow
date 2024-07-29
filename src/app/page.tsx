"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
  ContainerGame,
  ScrollableDiv,
  Table,
} from "./styles";
import { FaCopy } from "react-icons/fa";
import { Peer } from "peerjs";
import Parts from "@/components/Parts";
import BackgroundParts from "@/components/BackgroundParts";

export default function Home() {
  const peerInstance = useRef<any>(null);
  const [peerId, setPeerId] = useState("");
  const [url, setUrl] = useState("");
  const [connectedPeerOne, setConnectedPeerOne] = useState<Object | null>();
  const [connectedPeerTwo, setConnectedPeerTwo] = useState<Object | null>();
  const [partsPlayerOne, setPartsPlayerOne] = useState<Object | null>();
  const [partsPlayerTwo, setPartsPlayerTwo] = useState<Object | null>();
  const [currentPart, setCurrentPart] = useState<Array<string> | null>(null);
  const [allParts, setAllParts] = useState<Object | null>([
    ["1", "2"],
    ["2", "3"],
    ["2", "3"],
    ["2", "3"],
    ["2", "3"],
    ["1", "2"],
    ["2", "3"],
    ["2", "3"],
    ["2", "3"],
    ["2", "3"],
  ]);

  const getFirstPart = useCallback(() => {
    alert(currentPart);
    if (currentPart) {
      return currentPart;
    }
    const firstNumber = Math.floor(Math.random() * 7).toString();
    const secondNumber = Math.floor(Math.random() * 7).toString();
    setCurrentPart([firstNumber, secondNumber]);
    return [firstNumber, secondNumber];
  }, [currentPart]);

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
        const conn = myPeer.connect(`${data.peerId}`);

        conn.on("open", () => {
          if (data.type === "connection") {
            if (data.player === "1") {
              setConnectedPeerOne(data);
            }

            if (data.player === "2") {
              setConnectedPeerTwo(data);
            }
            sendMessageToPeer({
              peerId: data.peerId,
              data: { type: "parts", data: generateRandomPairs() },
            });
            sendMessageToPeer({
              peerId: data.peerId,
              data: {
                type: "currentPart",
                data: getFirstPart(),
              },
            });
          }
        });
      });
    });

    peerInstance.current = myPeer;

    return () => myPeer.destroy();
  }, []);

  const sendMessageToPeer = ({ peerId, data }: any) => {
    const conn = peerInstance.current.connect(`${peerId}`);

    conn.on("open", () => {
      conn.send(data);
    });
  };

  const generateRandomPairs = () => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const firstNumber = Math.floor(Math.random() * 7).toString();
      const secondNumber = Math.floor(Math.random() * 7).toString();
      result.push([firstNumber, secondNumber]);
    }
    return result;
  };

  const copyToClipboard = (player: string) => {
    navigator.clipboard.writeText(url + `?player=${player}`);
  };

  return connectedPeerOne ? (
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
  ) : (
    <ContainerGame>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Jogador 1</h1>
        {Array(7)
          .fill(7)
          .map(() => (
            <BackgroundParts color="red" />
          ))}
      </div>
      <Table>
        <div
          style={{
            zIndex: 10,
            background: "red",
            height: "100%",
            width: 100,
            borderRadius: 20,
          }}
        ></div>
        <div style={{ marginLeft: 16 }}>
          <p style={{ fontWeight: "bold" }}>Jogador 1</p>
          <p>7 peças</p>
        </div>
      </Table>
      {/* {currentPart && <Parts numbers={currentPart} />} */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img src="/logo_white.png" />
        <p style={{ fontWeight: "bold", color: "#fff", fontSize: 32 }}>Vez:</p>
        <div
          style={{
            zIndex: 10,
            background: "green",
            height: "100%",
            width: 100,
            borderRadius: 20,
          }}
        ></div>
        <p style={{ fontWeight: "bold", color: "#fff", fontSize: 32 }}>
          Jogue:
        </p>
        <div
          style={{
            zIndex: 10,
            background: "green",
            height: "100%",
            width: 100,
            borderRadius: 20,
          }}
        ></div>
      </div>
      {/* <div style={{ display: "flex" }}> */}
      <ScrollableDiv>
        {allParts &&
          allParts.map((item, index) => (
            <Parts
              key={index}
              numbers={item}
              isLast={index === allParts.length - 1}
            />
          ))}
      </ScrollableDiv>
      {/* </div> */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {Array(7)
          .fill(7)
          .map(() => (
            <BackgroundParts color="green" />
          ))}
      </div>
      <Table bottom isSelected>
        {/* <h1 >Jogador 2</h1> */}
        <div
          style={{
            zIndex: 10,
            background: "green",
            height: "100%",
            width: 100,
            borderRadius: 20,
          }}
        ></div>
        <div style={{ marginLeft: 16 }}>
          <p style={{ fontWeight: "bold" }}>Jogador 2</p>
          <p>7 peças</p>
        </div>
      </Table>
    </ContainerGame>
  );
}
