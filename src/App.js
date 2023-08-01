import './App.css';
import { Card, CardActions, CardContent, Grid, List, ListItem, ListItemText, TextField, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { elements } from './elements';
import { useState } from 'react';


function App() {

  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({id: "", playerName: "", playerRole: "", playerGoal: ""});
  const [isReady, setIsReady] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingRoles, setIsShowingRoles] = useState(false);
  const [showNextPlayerValues, setShowNextPlayerValues] = useState(false);
  const [currentShowingPlayer, setCurrentShowingPlayer] = useState(0)
  const [currentElement, setCurrentElement] = useState("");
  const randomNumberInRange = (min, max) => {
      return Math.floor(Math.random() 
              * (max - min + 1)) + min;
  };

  const handleChange = (ev) => {
    setNewPlayer({...newPlayer, id: players.length, playerName: ev.target.value});
  }

  const addNewPlayer = () => {
    setPlayers([...players, newPlayer]);
    setNewPlayer({playerName: "", playerRole: "", playerGoal: ""});

    players.length + 1 > 3 ? players.length + 1 < 8 ? setIsReady(false) : setIsReady(true) : setIsReady(true);
  }

  const startGame = () => {
    setCurrentElement(elements[randomNumberInRange(0, elements.length-1)]);
    const thisSpy = randomNumberInRange(0, players.length-1);

    const newPlayers = [...players];

    for(const player of newPlayers) {
      if(player.id === thisSpy) {
        newPlayers[player.id] = {id: player.id, playerName: player.playerName, playerRole: "Espião", playerGoal: "Encontrar o elemento de estudo e não ser detectado"};
      } else {
        newPlayers[player.id] = {id: player.id, playerName: player.playerName, playerRole: "Químico", playerGoal: "Proteger o elemento de estudo e identificar o espião"};
      }
    }

    setPlayers(newPlayers);
    setCurrentShowingPlayer(0);
    setIsPlaying(true);
    setIsShowingRoles(true);
  }

  const handleShowPlayerValues = () => {
    setShowNextPlayerValues(true);
  }

  const handlePlayerChange = () => {
    setShowNextPlayerValues(false);
    if(currentShowingPlayer < players.length - 1) {
      setCurrentShowingPlayer(currentShowingPlayer + 1);
    } else {
      setIsShowingRoles(false);
      setCurrentShowingPlayer(0);
    }
  }

  const handleGameOver = () => {
    setCurrentElement(elements[randomNumberInRange(0, elements.length-1)]);
    setPlayers([]);
    setIsPlaying(false);
    setIsReady(true);
  }

  return (
    <div className="App">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100%' }}
      >
        <Typography variant="h5" gutterBottom style={{ position: 'absolute', top: '10vh' }}>Tabela Gamer</Typography>
        {isPlaying ? 
          isShowingRoles ?
          <Card 
            sx={{ minWidth: '90vw' }}
          >
            {showNextPlayerValues ? 
              <CardContent>
                <Typography>{players[currentShowingPlayer].playerName}</Typography>
                <Typography>{players[currentShowingPlayer].playerRole}</Typography>
                <Typography>Sua missão:</Typography>
                <Typography>{players[currentShowingPlayer].playerGoal}</Typography>
                {players[currentShowingPlayer].playerRole !== "Espião"?
                  <div>
                    <Typography>Elemento estudado:</Typography>
                    <Typography>{currentElement}</Typography>
                  </div>
                    :
                  <div></div>
                }
              </CardContent>
              :
              <CardContent>
                <Typography>{players[currentShowingPlayer].playerName}</Typography>
              </CardContent>
            }
            <CardActions>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: '100%' }}
              >
                {showNextPlayerValues ? 
                <Button variant="contained" sx={{  marginTop: '15%'  }} onClick={handlePlayerChange}>Próximo jogador</Button>
                  :
                <Button variant="contained" sx={{  marginTop: '15%'  }} onClick={handleShowPlayerValues}>Mostrar</Button>
                }
              </Grid>
            </CardActions>
          </Card>
            :
          <Card 
            sx={{ minWidth: '90vw' }}
          >
            <CardContent>
              <Typography>Começou!</Typography>
            </CardContent>
            <CardActions>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: '100%' }}
              >
                <Button variant="contained" sx={{  marginTop: '15%'  }} onClick={handleGameOver}>Terminar o jogo</Button>
              </Grid>
            </CardActions>
          </Card>
            :
          <Card 
            sx={{ minWidth: '90vw' }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>Jogadores:</Typography>
              <List>
                {players.map((player) => (
                  <ListItem
                    key={player.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => {setPlayers(players.filter((item) => item !== player))}}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={player.playerName} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: '100%' }}
              >
                <TextField id="addPlayer" label="Adicione um jogador" variant="standard" onChange={handleChange} value={newPlayer.playerName}
                  InputProps={{
                    endAdornment: 
                      <IconButton edge="end" aria-label="delete" onClick={addNewPlayer}>
                        <SendIcon />
                      </IconButton>
                  }} 
                />
                <Button variant="contained" sx={{  marginTop: '15%'  }} disabled={isReady} onClick={startGame}>Começar</Button>
              </Grid>
            </CardActions>
          </Card>
        }
      </Grid>
    </div>
  );
}

export default App;
