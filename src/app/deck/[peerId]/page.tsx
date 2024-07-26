"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Peer } from "peerjs";

export default function Home({ params }: { params: { peerId: string } }) {
  const [connectedPeerId, setConnectedPeerId] = useState(null);
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

  return (
    <div>
      <h1>Deck</h1>
      <p>Your ID: {peerId}</p>
      <h3>Conectar</h3>
      <button onClick={connectToPeer}>Connect</button>
      {connectedPeerId && <p>Connected to: {connectedPeerId}</p>}
    </div>
  );
}
