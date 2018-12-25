import React, { Component } from 'react';
import ChessBoard from './components/ChessBoard';
import ChessPiece from './components/ChessPiece';
import { SizeMe } from 'react-sizeme';

class App extends Component {

  renderAtPosition = (wrapperWidth, { x, y }) => (
    <ChessPiece
      pieceName={'bishop'}
      color={'white'}
      boxWidth={wrapperWidth / 8}
    />
  )

  render() {
    return (
      <SizeMe>
        {({ size }) => (
          <ChessBoard
            primaryColor={'#EEEED5'}
            secondaryColor={'#7D955D'}
            wrapperWidth={size.width || -1}
            renderAtPosition={(...args) =>
              this.renderAtPosition(size.width, ...args)}
          />
        )}
      </SizeMe>
    );
  }
}

export default App;
