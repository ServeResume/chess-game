import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${props => props.reverseBoard && `transform: rotateX(180deg);`}
`;

const Row = styled.div`
  display: flex;
`;

const Box = styled.div`
  flex: 0 0 ${100 / 8}%;
  background: ${props => props.background};
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.reverseBoard && `transform: rotateX(180deg);`}
`;

const getBoxBackground = ({ primaryColor, secondaryColor }, { x, y }) => [
  primaryColor,
  secondaryColor,
][(x + y)%2];

const ChessBoard = ({
  primaryColor,
  secondaryColor,
  wrapperWidth,
  renderAtPosition,
  reverseBoard,
  onPositionClick,
  isPositionActive,
  activeColor,
}) => (
  <Wrapper
    reverseBoard={reverseBoard}
  >
    {range(8).map(x => (
      <Row
        key={x}
      >
        {range(8).map(y => (
          <Box
            key={y}
            style={{ height: wrapperWidth/8 }}
            reverseBoard={reverseBoard}
            background={
              isPositionActive({ x, y }) ?
                activeColor :
                getBoxBackground({
                  primaryColor,
                  secondaryColor,
                }, { x, y })
            }
            onClick={(e) => onPositionClick({ x, y }, e)}
          >
            {renderAtPosition({ x, y })}
          </Box>
        ))}
      </Row>
    ))}
  </Wrapper>
);

ChessBoard.propTypes = {
  activeColor: PropTypes.string.isRequired,
  wrapperWidth: PropTypes.number.isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  renderAtPosition: PropTypes.func.isRequired,
  reverseBoard: PropTypes.bool.isRequired,
  onPositionClick: PropTypes.func.isRequired,
  isPositionActive: PropTypes.func.isRequired,
};

export default ChessBoard;
