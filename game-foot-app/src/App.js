// Top-level application screen.

// Stylings
import './styles/styles.css';
import 'semantic-ui-css/semantic.min.css'
// React stuff
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
// Screens
import JoinScreen from "./screens/JoinScreen.js";
import LobbyScreen from "./screens/LobbyScreen.js";
import GameScreen from "./screens/GameScreen.js";
import ResultsScreen from "./screens/ResultsScreen.js";

function App() {

  // Temporary state to track the players.
  const [rankingsState, setRankingsState] = useState([
    ["RJ", 0],
    ["MetallicaFan420", 1],
    ["Arrjay", 2],
    ["Sleeves", 3],
    ["Paprino", 4],
    ["Zuniceratops", 5],
    ["NukedHyenas", 6],
    ["AipomMaster", 7],
  ])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={JoinScreen} />
        <Route path="/lobby/:any" component={LobbyScreen} />
        <Route path="/game/:any" render={(props) =>
          <GameScreen 
            rankingsState={rankingsState} 
            setRankingsState={setRankingsState}
          />
        }/>
        <Route path="/results/:any" render={(props) =>
          <ResultsScreen 
            rankingsState={rankingsState} 
            setRankingsState={setRankingsState}
          />
        }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
