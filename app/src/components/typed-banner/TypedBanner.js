import { Suspense, lazy } from "react";
import { Heading, Flex } from "rebass/styled-components";

const ReactTyped = lazy(() => import("react-typed"));

const TypedBanner = ({ typedSentences, stopped = false }) => (
  <Flex px="20%" py={5} my={4} backgroundColor="secondary">
    <Heading color="muted" sx={{ userSelect: "none" }}>
      <Suspense fallback="Loading...">
        <ReactTyped
          strings={typedSentences}
          typeSpeed={50}
          backSpeed={50}
          backDelay={1}
          loop
          smartBackspace
          stopped={stopped}
        />
      </Suspense>
    </Heading>
  </Flex>
);

export default TypedBanner;