import React, { Component } from 'react';
import ChessBoard from './components/ChessBoard';
import { SizeMe } from 'react-sizeme';

class App extends Component {
  render() {
    return (
      <SizeMe>
        {({ size }) => (
          <ChessBoard
            primaryColor={'#EEE'}
            secondaryColor={'#333'}
            wrapperWidth={size.width || -1}
          />
        )}
      </SizeMe>
    );
  }
}

export default App;
