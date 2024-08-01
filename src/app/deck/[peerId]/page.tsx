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
  const [currentPart, setCurrentPart] = useState([]);
  const peerInstance = useRef<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const player = searchParams.get("player");

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
            setCurrentPart(data.data);
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
    const set1 = new Set(currentPart);

    // alert(currentPart);

    const hasCommonString = data.some((item: any) => set1.has(item));
    if (hasCommonString) {
      sendMessageToPeer({
        type: "sendPart",
        newPart: data,
        peerId: peerId,
        player: player,
      });
      setPairs((prevPairs) => prevPairs.filter((pair) => pair !== data));
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
          <ButtonGetPart
            onClick={() => {
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
            }}
          >
            Comprar peça
          </ButtonGetPart>
          <ButtonGetPart>Passar a vez</ButtonGetPart>
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
