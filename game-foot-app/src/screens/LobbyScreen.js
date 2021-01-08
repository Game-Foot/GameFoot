// Lobby screen where players will wait for a game to start.

// Our Stylings
import '../styles/styles.css';
// Components
import PlayerIcon from "../utility-components/PlayerIcon.js";
// React Stuff
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Modal, Icon, Header, Button } from 'semantic-ui-react';

function LobbyScreen () {

  let gameCode = window.location.href.substring(window.location.href.length - 4, window.location.href.length);

  // TEMPORARY
  let players = [
    "RJ",
    "MetallicaFan420",
    "Arrjay",
    "Sleeves",
    "Paprino",
    "Zuniceratops",
    "NukedHyenas",
    "AipomMaster",
  ]

  const [optionsModalOpenState, setOptionsModalOpenState] = useState(false);
  const [returnHomeModalOpenState, setReturnHomeModalOpenState] = useState(false);

  return (
      <div className="lobbyScreen">

        <div className="lobbyScreenTop">
          <h2 className="lobbyJoinGameText">Join In!</h2>
          <p className="lobbyGameCodeText">{gameCode}</p>
        </div>

        <div className="lobbyScreenMiddle">
          <p className="lobbyScreenTitleLogo">STACK IT UP!</p>
          <div className="lobbyScreenButtonOptions">

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

            <Link to={{ pathname: "/game/" + gameCode }}>
              <div><button className="ui button massive darkClickButton" >Start Game</button></div>
            </Link>

            <Modal
              basic
              onClose={() => setOptionsModalOpenState(false)}
              onOpen={() => setOptionsModalOpenState(true)}
              open={optionsModalOpenState}
              size='small'
              trigger={<div><button className="ui icon button massive darkClickButton" ><Icon name='setting' /></button></div>}>
              <Header icon><Icon className='large settings' />
                  Game Options
                  <br></br>
                  <br></br>
                  put game options here lol
              </Header>
              <Modal.Actions className="joinScreenModalButtonContainer">
                <Button color="teal" onClick={() => setOptionsModalOpenState(false)}>OK</Button>
                <Button inverted color='red' onClick={() => setOptionsModalOpenState(false)}><Icon name='remove' />Close</Button>
              </Modal.Actions>
            </Modal>
          </div>
        </div>

        {/* This should probably be done in a map. */}
        <div className="lobbyScreenBottom">
          {players.map((playerName, index) => (
            <PlayerIcon className="lobbyScreenPlayerIcon" key={index} index={index} playerName={playerName}></PlayerIcon>
          ))}
        </div>
          
      </div>
  );
}

export default LobbyScreen;