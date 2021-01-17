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

  // Track the code used for the current game.
  const [gameCode, setGameCode] = useState("");

  // Track the state of each player in the game.
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

  // State to hold list of all questions that players will see in a single game.
  const [questionList, setQuestionList] = useState([
    ["Top 3", "Who's most likely to get laid this week?"],
    ["Who's most likely to be a cult leader?"]
  ])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() =>
          <JoinScreen 
            gameCode={gameCode}
            setGameCode={setGameCode}
          />
        }/>
        <Route path="/lobby/:any" render={() =>
          <LobbyScreen
            gameCode={gameCode}
            setGameCode={setGameCode}
            rankingsState={rankingsState} 
            setRankingsState={setRankingsState}
          />
        }/>
        <Route path="/game/:any" render={() =>
          <GameScreen 
            gameCode={gameCode}
            setGameCode={setGameCode}
            rankingsState={rankingsState} 
            setRankingsState={setRankingsState}
            questionList={questionList}
            setQuestionList={setQuestionList}
          />
        }/>
        <Route path="/results/:any" render={() =>
          <ResultsScreen
            gameCode={gameCode}
            setGameCode={setGameCode}
            rankingsState={rankingsState} 
            setRankingsState={setRankingsState}
          />
        }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
