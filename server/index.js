const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const GameRepository = require('./chess/GameRepository');
const StandardGameBuilder = require('./chess/StandardGameBuilder');

const gameRepository = new GameRepository();
const standardGameBuilder = new StandardGameBuilder();

app.get('/', function(req, res){
  res.send('Hello world');
});

const users = [
  { token: 'kareemToken', id: 123 },
  { token: 'younesToken', id: 456 },
];

io.of(/game\/[0-9]+/).on('connection', function(socket) {
  const gameId = socket.nsp.name.replace('/game/', '');
  const userToken = socket.handshake.query.userToken;

  const { id: userId } = users.find(user => user.token === userToken);

  let game = gameRepository.getById(gameId);

  if (!game) {
    game = standardGameBuilder.build(gameId);
    gameRepository.save(game);
  }

  try {
    if (!game.hasPlayer(userId)) {
      game.addPlayerId(userId);
    }
  } catch(err) {
    socket.emit('error_message', { message: err.message });
  }

  socket.emit('init', {
    playerColor: game.getPlayerColor(userId),
    pieces: game.getPieces(),
  });

  socket.on('movePiece', ({ fromPosition, toPosition }) => {
    try {
      game.movePiece(fromPosition, toPosition, userId);
    } catch(err) {
      socket.emit('error_message', { message: err.message });
    }

    socket.nsp.emit('update', {
      pieces: game.getPieces(),
    })
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});
