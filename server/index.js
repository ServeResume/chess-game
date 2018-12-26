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

  if (!game.hasPlayer(userId)) {
    game.addPlayerId(userId);
  }

  console.log(game.getPlayerColor(userId));
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});
