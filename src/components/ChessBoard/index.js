import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import styled from 'styled-components';

const Wrapper = styled.div`
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
}) => (
  <Wrapper>
    {range(8).map(x => (
      <Row
        key={x}
      >
        {range(8).map(y => (
          <Box
            key={y}
            style={{ height: wrapperWidth/8 }}
            background={
              getBoxBackground({
                primaryColor,
                secondaryColor,
              }, { x, y })
            }
          >
            {renderAtPosition({ x, y })}
          </Box>
        ))}
      </Row>
    ))}
  </Wrapper>
);

ChessBoard.propTypes = {
  wrapperWidth: PropTypes.number.isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  renderAtPosition: PropTypes.func.isRequired,
};

export default ChessBoard;
