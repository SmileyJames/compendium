import Paragraph from "components/paragraph";
import Heading from "components/heading";
import { Button, Box, Card, Image, Flex } from "rebass/styled-components";

const leftWidthVariants = {
  primary: ["20em", "22em"],
  secondary: ["14em", "16em"],
};

const rightWidthVariants = {
  primary: ["14em", "16em"],
  secondary: ["10em", "12em"],
};

const CallToActionCard = ({
  imageSrc,
  imageAlt,
  headingText,
  bodyText,
  onAction = () => {},
  buttonLabel,
  variant = "primary",
}) => {
  const leftWidth = leftWidthVariants[variant];
  const rightWidth = rightWidthVariants[variant];
  return (
    <Card m={3} display="inline-flex">
      <Flex flexDirection="row" height="100%">
        <Flex width={leftWidth} backgroundColor="gray" alignItems="center" justifyContent="center" m={3}>
          <Image src={imageSrc} alt={imageAlt} />
        </Flex>
        <Box width={rightWidth} m={3} pt={2}>
          <Heading variant={variant}>{headingText}</Heading>
          <Paragraph>{bodyText}</Paragraph>
          <Flex justifyContent="end" mt={3}>
            <Button
              onClick={onAction}
              onKeyPress={onAction}
              variant={variant}
            >
              {buttonLabel}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}

export default CallToActionCard;