"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Peer } from "peerjs";
import {
  ButtonConnect,
  ContainerConnect,
  TitleButtonConnect,
  ContainerGame,
  ContainerParts,
  ButtonGetPart,
} from "./styles";
import { PiPlugsConnectedFill } from "react-icons/pi";
import Parts from "@/components/Parts";

export default function Home({ params }: { params: { peerId: string } }) {
  const [isConnected, setIsConnected] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [pairs, setPairs] = useState([]);
  const [currentPart, setCurrentPart] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(false);
  const [isBuyPart, setIsBuyPart] = useState(false);
  const peerInstance = useRef<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const player = searchParams.get("player");

  useEffect(() => {
    if (player === "1") {
      setCurrentPlayer(true);
    }
  }, [player]);

  useEffect(() => {
    const myPeer = new Peer();

    myPeer.on("open", (id) => {
      console.log("My peer ID:", id);
      setPeerId(id);
    });

    myPeer.on("connection", (connection) => {
      console.log("Connection established with:", connection.peer);

      setIsBuyPart(false);

      connection.on("data", (data: any) => {
        console.log("Received message:", data);
        switch (data.type) {
          case "parts":
            setPairs(data.data);
            break;
          case "currentPart":
            setCurrentPart(data.data);
            break;
          case "changeCurrentPlayer":
            setCurrentPlayer(true);
            if (data.data) {
              setCurrentPart(data.data);
            }
            break;
          default:
        }
        setIsConnected(true);
      });
    });

    peerInstance.current = myPeer;

    return () => myPeer.destroy();
  }, [router, params]);

  const sendMessageToPeer = (data: any) => {
    const conn = peerInstance.current.connect(params.peerId);

    conn.on("open", () => {
      conn.send(data);
    });
  };

  const handleSendPart = (data: Array<string>) => {
    const hasCommonString = data.includes(currentPart);
    if (hasCommonString && currentPlayer) {
      if (data[0] === data[1]) {
        setCurrentPart(data[0]);
        sendMessageToPeer({
          type: "sendPart",
          newPart: { data: data, type: "0" },
          newNumber: data.find((part) => part !== currentPart) || data[0],
          peerId: peerId,
          player: player,
        });
      } else {
        setCurrentPart(data.find((part) => part !== currentPart));
        sendMessageToPeer({
          type: "sendPart",
          newPart: { data: data, type: data[1] === currentPart ? "1" : "2" },
          newNumber: data.find((part) => part !== currentPart) || data[0],
          peerId: peerId,
          player: player,
        });
      }
      setPairs((prevPairs) => prevPairs.filter((pair) => pair !== data));
      setCurrentPlayer(false);
    }
  };

  return isConnected ? (
    <ContainerGame>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <img src="/logo_white.png" style={{ margin: 0 }} />

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: 16,
          }}
        >
          <h1>MINHA VEZ {currentPlayer.toString()}</h1>
          <ButtonGetPart
            onClick={() => {
              if (currentPlayer && !isBuyPart) {
                setPairs((prevParts) => [
                  ...prevParts,
                  [
                    Math.floor(Math.random() * 7).toString(),
                    Math.floor(Math.random() * 7).toString(),
                  ],
                ]);
                sendMessageToPeer({
                  type: "buyPart",
                  peerId: peerId,
                  player: player,
                });
                setIsBuyPart(true);
              }
            }}
          >
            Comprar peça
          </ButtonGetPart>
          <ButtonGetPart
            onClick={() => {
              sendMessageToPeer({
                type: "nextPlayer",
                peerId: peerId,
                player: player,
              });
              setCurrentPlayer(false);
            }}
          >
            Passar a vez
          </ButtonGetPart>
        </div>
      </div>
      <ContainerParts>
        {pairs.map((item, index) => (
          <div key={index} onClick={() => handleSendPart(item)}>
            <Parts numbers={item} />
          </div>
        ))}
      </ContainerParts>
    </ContainerGame>
  ) : (
    <ContainerConnect>
      <img src="/logo_white.png" />
      <ButtonConnect
        onClick={() =>
          sendMessageToPeer({
            type: "connection",
            peerId: peerId,
            player: player,
          })
        }
      >
        <PiPlugsConnectedFill size={20} color="#fff" />
        <TitleButtonConnect>Conectar</TitleButtonConnect>
      </ButtonConnect>
    </ContainerConnect>
  );
}
