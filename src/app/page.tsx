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
  Circle,
  ContainerNumber,
  TextPlus,
} from "./styles";
import { FaCopy } from "react-icons/fa";
import { Peer } from "peerjs";
import Parts from "@/components/Parts";
import BackgroundParts from "@/components/BackgroundParts";
import PlayerIcon from "@/components/PlayerIcon";
import WinnerMessage from "@/components/WinnerMessage";

export default function Home() {
  const peerInstance = useRef<any>(null);
  const scrollableDivRef = useRef(null);
  const [peerId, setPeerId] = useState("");
  const [url, setUrl] = useState("");
  const [connectedPeerOne, setConnectedPeerOne] = useState<Object | null>(null);
  const [connectedPeerTwo, setConnectedPeerTwo] = useState<Object | null>(null);
  const [connectionFinished, setConnectionFinished] = useState<Object | null>();
  const [partsPlayerOne, setPartsPlayerOne] = useState<any>(0);
  const [partsPlayerTwo, setPartsPlayerTwo] = useState<any>(0);
  const [currentNumber, setCurrentNumber] = useState<string | null>("");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [allParts, setAllParts] = useState<Object | null>();
  const [isWinner, setIsWinner] = useState<string | null>();

  const getFirstPart = useCallback(() => {
    if (currentNumber) {
      return currentNumber;
    }
    const number = Math.floor(Math.random() * 7).toString();
    setCurrentNumber(number);
    setAllParts([{ data: [number, number], type: "0" }]);
    return number;
  }, [currentNumber]);

  useEffect(() => {
    setConnectionFinished(false);
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
          }
        });
      });
    });

    setConnectionFinished(true);

    peerInstance.current = myPeer;

    return () => myPeer.destroy();
  }, []);

  useEffect(() => {
    if (connectedPeerOne && connectedPeerTwo && connectionFinished) {
      peerInstance.current.on("connection", (connection) => {
        console.log("Connection established with:", connection.peer);

        connection.on("data", (data: any) => {
          const conn = peerInstance.current.connect(`${data.peerId}`);

          conn.on("open", () => {
            if (data.type === "sendPart") {
              setCurrentNumber(data.newNumber);
              setAllParts((prevParts) => [...prevParts, data.newPart]);
              if (data.player === "1") {
                setPartsPlayerOne((prev) => prev.slice(0, -1));
                sendMessageToPeer({
                  peerId: connectedPeerTwo?.peerId,
                  data: {
                    type: "changeCurrentPlayer",
                    data: data.newNumber,
                  },
                });
                setCurrentPlayer(2);
              }
              if (data.player === "2") {
                setPartsPlayerTwo((prev) => prev.slice(0, -1));
                sendMessageToPeer({
                  peerId: connectedPeerOne?.peerId,
                  data: {
                    type: "changeCurrentPlayer",
                    data: data.newNumber,
                  },
                });
                setCurrentPlayer(1);
              }
              if (scrollableDivRef.current) {
                setTimeout(() => {
                  scrollableDivRef.current.scrollTo({
                    left: scrollableDivRef.current.scrollWidth,
                    behavior: "smooth",
                  });
                }, 1000);
              }
            }
            if (data.type === "buyPart") {
              if (data.player === "1") {
                setPartsPlayerOne((prev) => [...prev, 7]);
              }
              if (data.player === "2") {
                setPartsPlayerTwo((prev) => [...prev, 7]);
              }
            }
            if (data.type === "nextPlayer") {
              if (data.player === "1") {
                sendMessageToPeer({
                  peerId: connectedPeerTwo?.peerId,
                  data: {
                    type: "changeCurrentPlayer",
                  },
                });
                setCurrentPlayer(2);
              }
              if (data.player === "2") {
                sendMessageToPeer({
                  peerId: connectedPeerOne?.peerId,
                  data: {
                    type: "changeCurrentPlayer",
                  },
                });
                setCurrentPlayer(1);
              }
            }
          });
        });
      });

      return () => peerInstance.current.destroy();
    }
  }, [connectedPeerOne, connectedPeerTwo, peerInstance, connectionFinished]);

  useEffect(() => {
    if (
      connectedPeerOne &&
      connectedPeerTwo &&
      !partsPlayerOne &&
      !partsPlayerTwo
    ) {
      const number = getFirstPart();
      sendMessageToPeer({
        peerId: connectedPeerOne.peerId,
        data: { type: "parts", data: generateRandomPairs() },
      });
      sendMessageToPeer({
        peerId: connectedPeerOne.peerId,
        data: {
          type: "currentPart",
          data: number,
        },
      });
      setPartsPlayerOne(Array(7).fill(7));
      sendMessageToPeer({
        peerId: connectedPeerTwo.peerId,
        data: { type: "parts", data: generateRandomPairs() },
      });
      sendMessageToPeer({
        peerId: connectedPeerTwo.peerId,
        data: {
          type: "currentPart",
          data: number,
        },
      });
      setPartsPlayerTwo(Array(7).fill(7));
    }
  }, [
    connectedPeerOne,
    connectedPeerTwo,
    partsPlayerOne,
    partsPlayerTwo,
    currentNumber,
  ]);

  const sendMessageToPeer = ({ peerId, data }: any) => {
    const conn = peerInstance.current.connect(peerId);

    conn.on("open", () => {
      conn.send(data);
    });
  };

  useEffect(() => {
    if (partsPlayerOne.length === 0) {
      setIsWinner("1");
    }
    if (partsPlayerTwo.length === 0) {
      setIsWinner("2");
    }
  }, [partsPlayerOne, partsPlayerTwo]);

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

  return !connectedPeerOne || !connectedPeerTwo ? (
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
  ) : isWinner ? (
    <Container>
      <img src="/logo_white.png" style={{ position: "absolute", top: 32 }} />
      <WinnerMessage player={isWinner} />
    </Container>
  ) : (
    <ContainerGame>
      <div style={{ display: "flex", alignItems: "center" }}>
        {partsPlayerOne.length > 1 &&
          partsPlayerOne.slice(0, 7).map(() => <BackgroundParts color="red" />)}
        {partsPlayerOne.length >= 8 && (
          <TextPlus style={{ fontSize: 32, zIndex: 100 }}>
            + {partsPlayerOne.length - 7}
          </TextPlus>
        )}
      </div>
      <Table isSelected={currentPlayer === 1}>
        <PlayerIcon color="red" player="1" />
        <div style={{ marginLeft: 16 }}>
          <p style={{ fontWeight: "bold" }}>Jogador 1</p>
          <p>{partsPlayerOne.length} peças</p>
        </div>
      </Table>
      <img
        src="/logo_white.png"
        style={{ position: "absolute", left: 8, top: 8 }}
      />
      {/* <div style={{ display: "flex" }}> */}
      {allParts && (
        <ScrollableDiv ref={scrollableDivRef} isScroll={allParts.length > 3}>
          {allParts &&
            allParts.map((item, index) => (
              <Parts
                key={index}
                numbers={item.data}
                isLast={index === allParts.length - 1}
                rotation={item.type}
              />
            ))}
        </ScrollableDiv>
      )}
      {/* </div> */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {partsPlayerOne.length > 1 &&
          partsPlayerOne
            .slice(0, 7)
            .map(() => <BackgroundParts color="green" />)}
        {partsPlayerOne.length >= 8 && (
          <TextPlus style={{ fontSize: 32, zIndex: 100 }}>
            + {partsPlayerOne.length - 7}
          </TextPlus>
        )}
      </div>
      <Table bottom isSelected={currentPlayer === 2}>
        {/* <h1 >Jogador 2</h1> */}
        <PlayerIcon color="green" player="2" />

        <div style={{ marginLeft: 16 }}>
          <p style={{ fontWeight: "bold" }}>Jogador 2</p>
          <p>{partsPlayerTwo.length} peças</p>
        </div>
      </Table>
    </ContainerGame>
  );
}
