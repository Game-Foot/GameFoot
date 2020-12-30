// Top-level application screen.

import './styles/App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import JoinScreen from "./screens/JoinScreen.js";
import LobbyScreen from "./screens/LobbyScreen.js";
import VoteScreen from "./screens/VoteScreen.js";
import ResultsScreen from "./screens/ResultsScreen.js";

function App() {

  const helperFunction = () => {
    console.log("e");
  }

  return (
    <body>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={JoinScreen} />
        <Route path="/lobby" component={LobbyScreen} />
        <Route path="/vote" component={VoteScreen} />
        <Route path="/results" component={ResultsScreen} />
        <Redirect from={"/:any", "/"} to={{ pathname: "/" }} />
      </Switch>
    </BrowserRouter>

    <script src="/socket.io/socket.io.js"></script>
    <script src="src/client.js"></script>
    </body>
  );
}

export default App;
