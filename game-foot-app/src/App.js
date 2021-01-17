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
    ["ARR[JAY]", 1, true],
    ["Arrjay", 2, true],
    ["Sleeves", 3, true],
    ["Paprino", 4, true],
    ["Tobbir69", 5, true],
    ["AndrewYang", 6, true],
    ["AipoMaster", 7, true],
    ["UserName1", 8, false],
    ["WWWWWWWWWW", 9, false],
  ])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={JoinScreen} />
        <Route path="/lobby/:any" render={() =>
          <LobbyScreen 
            rankingsState={rankingsState} 
            setRankingsState={setRankingsState}
          />
        }/>
        <Route path="/game/:any" render={() =>
          <GameScreen 
            rankingsState={rankingsState} 
            setRankingsState={setRankingsState}
          />
        }/>
        <Route path="/results/:any" render={() =>
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
