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
  TextButtonGetPart,
} from "./styles";
import { PiPlugsConnectedFill } from "react-icons/pi";
import Parts from "@/components/Parts";
import { GiDominoTiles } from "react-icons/gi";
import { ImNext2 } from "react-icons/im";
import PlayerIcon from "@/components/PlayerIcon";
import WinnerMessage from "@/components/WinnerMessage";

export default function Home({ params }: { params: { peerId: string } }) {
  const [isConnected, setIsConnected] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [pairs, setPairs] = useState<any>(null);
  const [currentPart, setCurrentPart] = useState<any>("");
  const [currentPlayer, setCurrentPlayer] = useState(false);
  const [isBuyPart, setIsBuyPart] = useState(false);
  const [isWinner, setIsWinner] = useState<number | string | null>(null);
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

      connection.on("data", (data: any) => {
        console.log("Received message:", data);
        switch (data.type) {
          case "parts":
            setPairs(data.data);
            break;
          case "currentPart":
            setIsBuyPart(false);
            setCurrentPart(data.data);
            break;
          case "changeCurrentPlayer":
            setIsBuyPart(false);
            setCurrentPlayer(true);
            if (data.data) {
              setCurrentPart(data.data);
            }
            break;
          case "isWinner":
            setIsWinner("0");
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
      setPairs((prevPairs: any) =>
        prevPairs.filter((pair: any) => pair !== data)
      );
      setCurrentPlayer(false);
    }
  };

  useEffect(() => {
    if (pairs && pairs.length === 0 && isConnected) {
      setIsWinner(1);
    }
  }, [pairs, isConnected]);

  return isConnected ? (
    isWinner ? (
      <ContainerGame>
        <WinnerMessage
          player={player}
          message={isWinner === 1 ? `Você venceu!` : "Você perdeu!"}
        />
      </ContainerGame>
    ) : (
      <ContainerGame>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <img src="/logo_white.png" />

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              width: "100%",
              marginBottom: 16,
            }}
          >
            <ButtonGetPart
              isSelected={
                !isBuyPart &&
                currentPlayer &&
                (player === "1" ? "red" : "orange")
              }
              onClick={() => {
                if (currentPlayer && !isBuyPart) {
                  setPairs((prevParts: any) => [
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
              <GiDominoTiles size={20} color="#fff" />
              <TextButtonGetPart>Comprar peça</TextButtonGetPart>
            </ButtonGetPart>
            <ButtonGetPart
              isSelected={
                currentPlayer &&
                isBuyPart &&
                (player === "1" ? "red" : "orange")
              }
              onClick={() => {
                if (currentPart && isBuyPart) {
                  sendMessageToPeer({
                    type: "nextPlayer",
                    peerId: peerId,
                    player: player,
                  });
                  setCurrentPlayer(false);
                }
              }}
            >
              <ImNext2 size={20} color="#fff" />
              <TextButtonGetPart>Passar a vez</TextButtonGetPart>
            </ButtonGetPart>
          </div>
        </div>
        <ContainerParts>
          {pairs.map((item: any, index: any) => (
            <div key={index} onClick={() => handleSendPart(item)}>
              <Parts
                numbers={item}
                playableColor={
                  item.includes(currentPart) &&
                  currentPlayer &&
                  (player === "1" ? "red" : "orange")
                }
              />
            </div>
          ))}
        </ContainerParts>
      </ContainerGame>
    )
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
