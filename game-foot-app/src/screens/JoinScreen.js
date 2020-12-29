// Splash screen that users will see upon loading the game page.

// Stylings
import '../styles/styles.css';
// React stuff
import React, { useState } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";

function JoinScreen () {

  const [joinModalOpenStatus, setJoinModalOpenStatus] = useState(false);
  const [hostModalOpenStatus, setHostModalOpenStatus] = useState(false);
  const [isHosting, setHostingStatus] = useState(null);

  const joinGame = () => {
    setJoinModalOpenStatus(false);
    setHostingStatus(false);
  }

  const hostGame = () => {
    setHostModalOpenStatus(false);
    setHostingStatus(true);
  }

  return (
    <div className="joinScreen">
      {/* Top Third */}
      <div className="joinScreenTopThird">
        <p className="joinScreenTitleLogo">STACK IT UP!</p>
      </div>
      {/* Middle Third */}
      <div className="joinScreenmiddleThird">
        
        <Modal
          basic
          onClose={() => setJoinModalOpenStatus(false)}
          onOpen={() => setJoinModalOpenStatus(true)}
          open={joinModalOpenStatus}
          size='small'
          trigger={<button className="ui button massive joinScreenPlayButton" onClick={joinGame}>Join Game</button>}>
          <Header icon><Icon className='large user plus' />
              Join Game
              <br></br>
              <br></br>
              <div class="ui input"><input type="text" width="35" placeholder="Enter room code..." style={{backgroundColor: "var(--light)"}}/></div>
          </Header>
          <Modal.Actions className="joinScreenModalButtonContainer">
            <Button color="teal" onClick={joinGame}><Icon name='user plus'/>Join!</Button>
            <Button inverted color='red' onClick={() => setJoinModalOpenStatus(false)}><Icon name='remove' />Close</Button>
          </Modal.Actions>
        </Modal>

        <div className="joinScreenUserOptions">
          <p className="joinScreenUsernameLabel">User Profile</p>
          <div class="ui input"><input type="text" width="35" placeholder="Enter username..." style={{backgroundColor: "var(--light)"}}/></div>
          <br></br>
          <button className="ui button large joinScreenPlayButton">Upload Picture</button>
        </div>

        <Modal
          basic
          onClose={() => setHostModalOpenStatus(false)}
          onOpen={() => setHostModalOpenStatus(true)}
          open={hostModalOpenStatus}
          size='small'
          trigger={<button className="ui button massive joinScreenPlayButton">Host Game</button>}>
          <Header icon><Icon className='large users' />
              Host Game
              <br></br>
              <h1>Room Code: 012345</h1>
          </Header>
          <Modal.Actions className="joinScreenModalButtonContainer">
            <Link to={{ pathname: "/lobby/012345" }}>
              <Button color="teal" onClick={hostGame}><Icon name='users'/>Host!</Button>
            </Link>
            <Button color="secondary"><Icon name='setting'/>Options</Button>
            <Button inverted color='red' onClick={() => setHostModalOpenStatus(false)}><Icon name='remove' />Close</Button>
          </Modal.Actions>
        </Modal>

      </div>

      {/* Bottom Third */}
      <div className="joinScreenBottomThird">
        <p>by Chris Hopkins, Jacob Gruza &amp; Tian Brown</p>
        <p>&#169; 2021 Game Foot Enterprises</p>
      </div>
    </div>
  );
}

export default JoinScreen;
