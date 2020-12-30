// Top-level application screen.

// Stylings
import './styles/styles.css';
import 'semantic-ui-css/semantic.min.css'
// React stuff
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Screens
import JoinScreen from "./screens/JoinScreen.js";
import LobbyScreen from "./screens/LobbyScreen.js";
import VoteScreen from "./screens/VoteScreen.js";
import ResultsScreen from "./screens/ResultsScreen.js";

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={JoinScreen} />
        <Route path="/lobby/:any" component={LobbyScreen} />
        <Route path="/vote" component={VoteScreen} />
        <Route path="/results" component={ResultsScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
