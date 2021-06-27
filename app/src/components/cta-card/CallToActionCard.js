import { Button, Box, Text, Card, Image, Heading, Flex } from "rebass/styled-components";

const sizeToLeftWidth = (sizeNum) => {
  if (sizeNum > 1) return ["20em", "22em"];
  return ["14em", "16em"];
}

const sizeToRightWidth = (sizeNum) => {
  if (sizeNum > 1) return ["14em", "16em"];
  return ["10em", "12em"];
}

const CallToActionCard = ({
  size = 1,
  imageSrc,
  imageAlt,
  headingText,
  bodyText,
  onCallToAction,
  buttonLabel
}) => (
  <Card m={3}>
    <Flex flexDirection="row" height="100%">
      <Flex width={sizeToLeftWidth(size)} backgroundColor="gray" alignItems="center" justifyContent="center" m={3}>
        <Image src={imageSrc} alt={imageAlt} />
      </Flex>
      <Box width={sizeToRightWidth(size)} m={3} pt={2}>
        <Heading>{headingText}</Heading>
        <Text>{bodyText}</Text>
        <Flex justifyContent="end" mt={3}>
          <Button
            onClick={onCallToAction}
            onKeyPress={onCallToAction}
            variant="primary"
          >
            {buttonLabel}
          </Button>
        </Flex>
      </Box>
    </Flex>
  </Card>
);

export default CallToActionCard;