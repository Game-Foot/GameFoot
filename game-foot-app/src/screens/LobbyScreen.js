// Lobby screen where players will wait for a game to start.

import '../styles/styles.css';
import PlayerIcon from "../utility-components/PlayerIcon.js";

function LobbyScreen () {

  let gameCode = window.location.href.substring(window.location.href.length - 4, window.location.href.length);

  return (
      <div className="lobbyScreen">

        <div className="lobbyScreenTop">
          <h2 className="lobbyJoinGameText">Join In!</h2>
          <p className="lobbyGameCodeText">{gameCode}</p>
        </div>

        <div className="lobbyScreenMiddle">
          <p className="lobbyScreenTitleLogo">STACK IT UP!</p>
        </div>

        {/* This should probably be done in a map. */}
        <div className="lobbyScreenBottom">
          <PlayerIcon className="lobbyScreenPlayerIcon" index={0} playerName="Tobbir69"></PlayerIcon>
          <PlayerIcon className="lobbyScreenPlayerIcon" index={1} playerName="MetallicaFan420"></PlayerIcon>
          <PlayerIcon className="lobbyScreenPlayerIcon" index={2} playerName="Arrjay"></PlayerIcon>
          <PlayerIcon className="lobbyScreenPlayerIcon" index={3} playerName="Sleeves"></PlayerIcon>
          <PlayerIcon className="lobbyScreenPlayerIcon" index={4} playerName="Paprino"></PlayerIcon>
          <PlayerIcon className="lobbyScreenPlayerIcon" index={5} playerName="Zuniceratops"></PlayerIcon>
          <PlayerIcon className="lobbyScreenPlayerIcon" index={6} playerName="NukedHyenas"></PlayerIcon>
          <PlayerIcon className="lobbyScreenPlayerIcon" index={7} playerName="AipomMaster"></PlayerIcon>
        </div>
          
      </div>
  );
}

export default LobbyScreen;