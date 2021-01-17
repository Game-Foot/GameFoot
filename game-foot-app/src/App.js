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

  // Track the number of rounds that have passed.
  const [roundsPassed, setRoundsPassed] = useState(0);

  // Track the state of each player in the game.
  const [rankingsState, setRankingsState] = useState([
    // Username, id(?), visibility(temporary), picture, score
    ["RJ", 0, true, "", 0],
    ["ARR[JAY]", 1, true, "", 0],
    ["Arrjay", 2, true, "", 0],
    ["Sleeves", 3, true, "", 0],
    ["Paprino", 4, true, "", 0],
    ["Tobbir69", 5, true, "", 0],
    ["AndrewYang", 6, true, "", 0],
    ["AipoMaster", 7, true, "", 0],
    ["UserName1", 8, false, "", 0],
    ["WWWWWWWWWW", 9, false, "", 0],
  ])

  // State to hold list of all questions that players will see in a single game.
  const [questionList, setQuestionList] = useState([
    ["Top 3", "Who's most likely to get laid this week?"],
    ["Top 1", "Who's most likely to be a cult leader?"],
    ["Top 3", "Most likely to accidentally kill somebody?"],
    ["Either-Or", "Who would lose in a presidential election?"],
    ["Either-Or", "Who would be more likely to accidentally appear on TV?"],
    ["Rank", "Rank the group from most goofy to least goofy"],
    ["Top 1", "Most likely to become a meme?"],
    ["Top 1", "Most likely to get arrested?"],
    ["Rank", "Rank the group from most sex appeal to least sex appeal"],
    ["Rank", "Rank the group from best cooking skills to worst cooking skills"],
    ["Rank", "Rank the group on their (theoretical) fastest mile run time"],
    ["Top 3", "Who's most likely to go streaking?"],
    ["Top 3", "Who's most likely to go viral on the Internet for doing something stupid?"],
    ["Rank", "Rank the group from most dominant to most submissive"],
    ["Either-Or", "Who's more likely to be in a political scandal?"],
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
            roundsPassed={roundsPassed}
            setRoundsPassed={setRoundsPassed}
          />
        }/>
        <Route path="/results/:any" render={() =>
          <ResultsScreen
            gameCode={gameCode}
            setGameCode={setGameCode}
            rankingsState={rankingsState} 
            setRankingsState={setRankingsState}
            questionList={questionList}
            setQuestionList={setQuestionList}
            roundsPassed={roundsPassed}
            setRoundsPassed={setRoundsPassed}
          />
        }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
