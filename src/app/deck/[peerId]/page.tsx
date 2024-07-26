"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Peer } from "peerjs";
import {
  ButtonConnect,
  ContainerConnect,
  TitleButtonConnect,
  ContainerGame,
  ContainerParts,
} from "./styles";
import { PiPlugsConnectedFill } from "react-icons/pi";
import Parts from "@/components/Parts";

export default function Home({ params }: { params: { peerId: string } }) {
  const [isConnected, setIsConnected] = useState(false);
  const [peerId, setPeerId] = useState("");
  const peerInstance = useRef<any>(null);

  const router = useRouter();

  useEffect(() => {
    const myPeer = new Peer();

    myPeer.on("open", (id) => {
      console.log("My peer ID:", id);
      setPeerId(id);
    });

    myPeer.on("connection", (connection) => {
      console.log("Connection established with:", connection.peer);

      connection.on("data", (data) => {
        console.log("Received message:", data);
        setIsConnected(true);
      });
    });

    const conn = myPeer.connect(params.peerId);

    conn.on("open", () => {
      conn.send("hi!");
    });

    peerInstance.current = myPeer;

    return () => myPeer.destroy();
  }, [router, params]);

  const connectToPeer = () => {
    const conn = peerInstance.current.connect(params.peerId);
    conn.on("open", () => {
      conn.send(peerId);
    });
  };

  const parts = [
    ["1", "6"],
    ["0", "2"],
    ["3", "4"],
    ["5", "5"],
  ];

  return isConnected ? (
    <ContainerGame>
      <img src="/logo_white.png" />
      <ContainerParts>
        {parts.map((item, index) => (
          <Parts key={index} numbers={item} />
        ))}
      </ContainerParts>
    </ContainerGame>
  ) : (
    <ContainerConnect>
      <img src="/logo_white.png" />
      <ButtonConnect onClick={connectToPeer}>
        <PiPlugsConnectedFill size={20} color="#fff" />
        <TitleButtonConnect>Conectar</TitleButtonConnect>
      </ButtonConnect>
    </ContainerConnect>
  );
}
