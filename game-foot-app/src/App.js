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
    ["RJ", 0, true],
    ["MetallicaFan420", 1, true],
    ["Arrjay", 2, true],
    ["Sleeves", 3, true],
    ["Paprino", 4, true],
    ["Zuniceratops", 5, true],
    ["NukedHyenas", 6, true],
    ["AipomMaster", 7, true],
    ["UserName1", 8, false],
    ["UserName2", 9, false],
  ])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={JoinScreen} />
        <Route path="/lobby/:any" render={(props) =>
          <LobbyScreen 
            rankingsState={rankingsState} 
            setRankingsState={setRankingsState}
          />
        }/>
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
