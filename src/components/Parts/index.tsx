"use client";
import { useEffect, useState, useRef } from "react";
import { Circle, Container, ContainerNumber, Line } from "./styles";

export default function Parts({ numbers }: { numbers: Array<string> }) {
  const number = (value: string) => {
    switch (value) {
      case "0":
        return <ContainerNumber justifyContent="center"></ContainerNumber>;
      case "1":
        return (
          <ContainerNumber justifyContent="center">
            <Circle />
          </ContainerNumber>
        );
      case "2":
        return (
          <ContainerNumber justifyContent="space-between">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                margin: 16,
              }}
            >
              <Circle />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                margin: 16,
              }}
            >
              <Circle />
            </div>
          </ContainerNumber>
        );
      case "3":
        return (
          <ContainerNumber justifyContent="space-between">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
            </div>
          </ContainerNumber>
        );
      case "4":
        return (
          <ContainerNumber justifyContent="space-between">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
              <Circle />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
              <Circle />
            </div>
          </ContainerNumber>
        );
      case "5":
        return (
          <ContainerNumber justifyContent="space-between">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
              <Circle />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
              <Circle />
            </div>
          </ContainerNumber>
        );
      case "6":
        return (
          <ContainerNumber justifyContent="space-between">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
              <Circle />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
              <Circle />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: 8,
              }}
            >
              <Circle />
              <Circle />
            </div>
          </ContainerNumber>
        );
    }
  };
  return (
    <Container>
      {number(numbers[0])}
      <Line />
      {number(numbers[1])}
    </Container>
  );
}