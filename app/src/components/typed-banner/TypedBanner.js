import ReactTyped from "react-typed";
import { Heading, Flex } from "rebass/styled-components";

const TypedBanner = ({ typedSentences, stopped = false }) => (
  <Flex px="20%" py={5} my={4} backgroundColor="secondary">
    <Heading color="muted" sx={{ userSelect: "none" }}>
      <ReactTyped
        strings={typedSentences}
        typeSpeed={50}
        backSpeed={50}
        backDelay={1}
        loop
        smartBackspace
        stopped={stopped}
      />
    </Heading>
  </Flex>
);

export default TypedBanner;