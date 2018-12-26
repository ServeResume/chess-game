import React from 'react';
import io from 'socket.io-client';
import ChessGame from '../../components/ChessGame';
import getQueryParameterByName from '../../utils/getQueryParameterByName';

class ChessGameContainer extends React.Component {
  state = {
    clickedPosition: null,
    playerColor: null,
    pieces: [],
    errorMessage: null,
  };

  componentDidMount() {
    const userToken = getQueryParameterByName('userToken');
    const gameId = getQueryParameterByName('gameId');

    this.socket = io(`http://localhost:4000/game/${gameId}`, {
      query: {
        userToken,
      }
    });

    this.socket.on('init', ({ pieces, playerColor }) => {
      this.setState({
        pieces,
        playerColor,
      });
    })

    this.socket.on('update', ({ pieces }) => {
      this.setState({
        pieces,
      });
    })

    this.socket.on('error_message', ({ message }) => {
      this.setState({
        errorMessage: message,
      });
    })
  }

  onPositionClick = ({ x, y }) => {
    const piece = this.state.pieces[x][y];

    if (this.equalPositions(this.state.clickedPosition, { x, y })) {
      this.setState({
        clickedPosition: null,
      })
    }
    else if(this.state.clickedPosition) {
      this.movePiece(this.state.clickedPosition, { x, y });
      this.setState({ clickedPosition: null });
    }
    else if(piece) {
      this.setState({
        clickedPosition: { x, y },
      });
    }
  }

  movePiece = (fromPosition, toPosition) => {
    this.socket.emit('movePiece', {
      fromPosition,
      toPosition,
    });
  }

  equalPositions = (p1, p2) =>
    p1 && p2 && p1.x === p2.x && p1.y === p2.y;

  isPositionActive = (position) => {
    return this.equalPositions(this.state.clickedPosition, position);
  };

  render() {
    const {
      playerColor,
      pieces,
      errorMessage,
    } = this.state;

    if (pieces.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ChessGame
          pieces={pieces}
          currentPlayer={playerColor}
          isPositionActive={this.isPositionActive}
          onPositionClick={this.onPositionClick}
        />
        {errorMessage && (
          <div>{errorMessage}</div>
        )}
      </div>
    );
  }
}

export default ChessGameContainer;
