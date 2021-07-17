import { render } from '@testing-library/react';
import JoinScreen from "./index";
import QRCode from "qrcode.react"

let qrValue;
jest.mock('qrcode.react', () => ({ value }) => {
  qrValue = value;
  return null;
})

describe("Join screen", () => {
	test("Renders code as text, QR and link", () => {
    const { queryByText, getByRole } = render(
      <JoinScreen roomCode="XVXV"/>
    );

    const textCode = queryByText("XVXV");
    expect(textCode).toBeInTheDocument();

    expect(qrValue).toBe("http://localhost/guest/XVXV")
    
    const link = getByRole("link");
    expect(link.href).toBe("http://localhost/guest/XVXV")
  })
})