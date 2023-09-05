import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CryptoInfo from "./CryptoInfo";

describe("CryptoInfo Component", () => {
  test('renders "Selected Cryptocurrency" when selectedCrypto is provided', () => {
    render(<CryptoInfo selectedCrypto="BTC" />);
    expect(
      screen.getByText("Selected Cryptocurrency: BTC")
    ).toBeInTheDocument();
  });

  test("renders cryptoInfo when provided", () => {
    const mockCryptoInfo = {
      high: "60000",
      low: "58000",
    };
    render(<CryptoInfo selectedCrypto="BTC" cryptoInfo={mockCryptoInfo} />);

    expect(screen.getByText(/High:/i)).toBeInTheDocument();
    expect(screen.getByText(/Low:/i)).toBeInTheDocument();
    expect(screen.getByText("60000")).toBeInTheDocument();
    expect(screen.getByText("58000")).toBeInTheDocument();
  });

  test('does not render "Selected Cryptocurrency" when selectedCrypto is not provided', () => {
    render(<CryptoInfo />);
    const selectedCryptoElement = screen.queryByText(
      /Selected Cryptocurrency:/i
    );
    expect(selectedCryptoElement).not.toBeInTheDocument();
  });

  test('does not render "Information" when cryptoInfo is not provided', () => {
    render(<CryptoInfo selectedCrypto="BTC" />);
    const infoElement = screen.queryByText(/Information:/i);
    expect(infoElement).not.toBeInTheDocument();
  });
});
