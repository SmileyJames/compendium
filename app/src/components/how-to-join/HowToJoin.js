import Heading from "components/heading";
import Paragraph from "components/paragraph";
import { Flex, Box, Link } from "rebass/styled-components";
import QRCode from "qrcode.react";

const roomCodeToUrl = (roomCode) => (
  `${window.location.host}/#/guest/${roomCode}`
);

const roomCodeToHref = (roomCode) => (
  `${window.location.protocol}//${roomCodeToUrl(roomCode)}`
);

const TextRoomCode = ({ roomCode }) => (
  <>
    <Heading py={3}>{roomCode}</Heading>
    <Paragraph>Enter this room code</Paragraph>
  </>
)

const ScanRoomCode = ({ roomCode }) => (
  <>
    <Box m={1}>
      <QRCode value={roomCodeToHref(roomCode)}/>
    </Box>
    <Paragraph>Scan this QR code</Paragraph>
  </>
)

const LinkRoomCode = ({ roomCode }) => (
  <>
    <Paragraph my={2}>
      <Link href={roomCodeToHref(roomCode)}>{roomCodeToUrl(roomCode)}</Link>
    </Paragraph>
    <Paragraph>
      Follow this link
    </Paragraph>
  </>
);

const FullWidthColumn = ({ children }) => (
  <Flex my={3} flexDirection="column" justifyContent="center" alignItems="center" width={1}>
    {children}
  </Flex>
);

const HalfWidthColumn = ({ children }) => (
  <Flex py={2} flexDirection="column" justifyContent="center" alignItems="center" width={[1, 1/2]}>
    {children}
  </Flex>
);

function HowToJoin({ roomCode, ...props }) {
  return (
    <Flex flexWrap="wrap">
      <HalfWidthColumn>
        <TextRoomCode roomCode={roomCode}/>
      </HalfWidthColumn>
      <HalfWidthColumn>
        <ScanRoomCode roomCode={roomCode}/>
      </HalfWidthColumn>
      <FullWidthColumn>
        <LinkRoomCode roomCode={roomCode}/>
      </FullWidthColumn>
    </Flex>
  );
}

export default HowToJoin;