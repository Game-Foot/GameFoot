// Lobby screen where players will wait for a game to start.

// Our Stylings
import '../styles/styles.css';
// Components
import PlayerIcon from "../utility-components/PlayerIcon.js";
// React Stuff
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Modal, Icon, Header, Button, Label, Checkbox } from 'semantic-ui-react';
// Images
import stackItUpLogo2 from '../img/SIU Logo 2.png';

function LobbyScreen (props) {
  let gameCode = window.location.href.substring(window.location.href.length - 4, window.location.href.length);
  const MIN_PLAYERS = 4;
  const MAX_PLAYERS = 10;
  const [optionsModalOpenState, setOptionsModalOpenState] = useState(false);
  const [returnHomeModalOpenState, setReturnHomeModalOpenState] = useState(false);
  const [lastInputValid, setLastInputValid] = useState(true);
  let numPlayersDefault = 0;
  for (let i = 0; i < MAX_PLAYERS; i++) {
    if (props.rankingsState[i][2] === true) { numPlayersDefault++; }
  }
  const [numPlayers, setNumPlayers] = useState(numPlayersDefault);

  const changeNumPlayers = (num) => {
    if (isNaN(num)) {
        setNumPlayers("");
        setLastInputValid(false);
    }
    else if (num >= MIN_PLAYERS && num <= MAX_PLAYERS) {
        setNumPlayers(parseInt(num));
        setLastInputValid(true);
        // Adjust top-level object to reflect number of players.
        props.rankingsState[num - 1][2] = true;
        for (let i = num; i < MAX_PLAYERS; i++) {
          props.rankingsState[i][2] = false;
        }
    }
    else {
        setLastInputValid(false);
    }
}

  return (
      <div className="lobbyScreen">

        <div className="lobbyScreenTop">
          <div className="lobbyTopLeft">
            <h2 className="lobbyJoinGameText">Join In!</h2>
            <p className="lobbyGameCodeText">{gameCode}</p>
          </div>
          <img className="stackItUpLogo2" src={stackItUpLogo2} alt=""></img>
          <div className="lobbyTopRight">
            <div style={{display: "flex", marginBottom: "1%"}}>
            <Modal
              basic
              onClose={() => setReturnHomeModalOpenState(false)}
              onOpen={() => setReturnHomeModalOpenState(true)}
              open={returnHomeModalOpenState}
              size='small'
              trigger={<div><button className="ui icon button massive darkClickButton" ><Icon name='home' /></button></div>}>
              <Header icon><Icon className='large exclamation triangle' />
                <br></br>
                Are you sure you want to close this lobby?
              </Header>
              <Modal.Actions className="joinScreenModalButtonContainer">
                <Link to={{ pathname: "/" }}>
                  <Button color="teal" onClick={() => setReturnHomeModalOpenState(false)}>Yes</Button>
                </Link>
                <Button inverted color='red' onClick={() => setReturnHomeModalOpenState(false)}>No</Button>
              </Modal.Actions>
            </Modal>

            <Modal
              basic
              onClose={() => setOptionsModalOpenState(false)}
              onOpen={() => setOptionsModalOpenState(true)}
              open={optionsModalOpenState}
              size='small'
              trigger={<div><button className="ui icon button massive darkClickButton" ><Icon name='setting' /></button></div>}>
              <Header icon><Icon className='large settings' />Game Options</Header>
              <Modal.Content style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                Number of Players
                <br></br><br></br>
                <div className="ui input">
                  <button className="ui button icon" onClick={() => changeNumPlayers(numPlayers - 1)}>
                      <i className="angle left icon" />
                  </button>
                  {!lastInputValid && <Label style={{ position: "absolute", marginTop: "4em" }} pointing='above'>Please enter a value between {MIN_PLAYERS}-{MAX_PLAYERS}</Label>}
                  <input id="songNumberInput" size="1" maxLength="1" value={numPlayers} style={{ backgroundColor: "var(--light)" }}
                      onChange={(e) => changeNumPlayers(parseInt(e.target.value))} />
                  <button className="ui button icon" onClick={() => changeNumPlayers(numPlayers + 1)}>
                      <i className="angle right icon" />
                  </button>
                </div>
                <br></br><br></br>
                <div className="enablePrompts"><Checkbox label='Enable Custom Prompts' /></div>
              </Modal.Content>
              <Modal.Actions className="joinScreenModalButtonContainer">
                <Button inverted color='red' onClick={() => setOptionsModalOpenState(false)}><Icon name='remove' />Close</Button>
              </Modal.Actions>
            </Modal>
            </div>
            

            <Link to={{ pathname: "/game/" + gameCode }}>
              <div><button className="ui button massive darkClickButton" >Start Game</button></div>
            </Link>

          </div>
        </div>

        <div className="lobbyScreenBottom">
          {props.rankingsState.map((playerInfo, index) => (
            (index < numPlayers && playerInfo[2] === true) ? <PlayerIcon lobby={true} key={index} index={index} playerName={playerInfo[0]}></PlayerIcon> : null
          ))}
          {}
        </div>
          
      </div>
  );
}

export default LobbyScreen;