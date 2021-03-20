import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: -9em;
  margin-right: -3em;

  ${({ order }) => order && `order: ${order};`}
`;

const UnSelectable = styled.div`
  position: relative;
  margin-top: 2em;
`;

const Selectable = styled(UnSelectable)`
  &:hover {
    margin-top: 1em;
    margin-bottom: 1em;
    cursor: pointer;
  }

  ${({ isSelected }) => isSelected && `
    margin-top: 0em;
    margin-bottom: 2em;

    &:hover {
      margin-top: 0em;
      margin-bottom: 2em;
    }
  `}
`;

const Overlay = styled.div`
  opacity: 0.4;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5em;

  ${({ isSelected, selectColor }) => isSelected && selectColor && `
    background-color: ${selectColor};
  `}
`;

const FaceImg = styled.img`
  width: 9em;
  display: block;
`;

const SelectableFace = ({ isSelected, selectColor, faceImage, altText, onClick }) => (
  <Selectable isSelected={isSelected}>
    <FaceImg src={faceImage} alt={altText} />
    <Overlay isSelected={isSelected} selectColor={selectColor} onClick={onClick}/>
  </Selectable>
);

const UnSelectableFace = ({ faceImage, altText }) => (
  <UnSelectable>
    <FaceImg src={faceImage} alt={altText}/>
  </UnSelectable>
);

const Card = ({ order, canBeSelected, isSelected, selectColor, faceImage, altText, onClick }) => {
  const Face = canBeSelected ? SelectableFace : UnSelectableFace;
  return (
    <Container order={order}>
      <Face isSelected={isSelected} selectColor={selectColor} faceImage={faceImage} altText={altText} onClick={onClick} />
    </Container>
  );
}

export default Card;
