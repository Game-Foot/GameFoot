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
  const [hostCode, setHostCode] = useState("");

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const joinGame = () => {
    setJoinModalOpenStatus(false);
    // setHostingStatus(false);
  }

  const hostGame = () => {
    setHostModalOpenStatus(false);
    // setHostingStatus(true);
  }

  const generateHostCode = () => {
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // console.log(code);
    setHostCode(code);
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
          trigger={<button className="ui button massive darkClickButton" onClick={joinGame}>Join Game</button>}>
          <Header icon><Icon className='large user plus' />
              Join Game
              <br></br>
              <br></br>
              <div className="ui input"><input type="text" width="35" placeholder="Enter room code..." style={{backgroundColor: "var(--light)"}}/></div>
          </Header>
          <Modal.Actions className="joinScreenModalButtonContainer">
            <Button color="teal" onClick={joinGame}><Icon name='user plus'/>Join!</Button>
            <Button inverted color='red' onClick={() => setJoinModalOpenStatus(false)}><Icon name='remove' />Close</Button>
          </Modal.Actions>
        </Modal>

        <div className="joinScreenUserOptions">
          <p className="joinScreenUsernameLabel">User Profile</p>
          <div className="ui input"><input type="text" width="35" placeholder="Enter username..." style={{backgroundColor: "var(--light)"}}/></div>
          <br></br>
          <button className="ui button large darkClickButton">Upload Picture</button>
        </div>
        <Modal
          basic
          onClose={() => setHostModalOpenStatus(false)}
          onOpen={() => setHostModalOpenStatus(true)}
          open={hostModalOpenStatus}
          size='small'
          trigger={<button className="ui button massive darkClickButton" onClick={generateHostCode}>Host Game</button>}>
          <Header icon><Icon className='large users' />
              Host Game
              <br></br>
              <h1>Room Code: {hostCode}</h1>
          </Header>
          <Modal.Actions className="joinScreenModalButtonContainer">
            <Link to={{ pathname: "/lobby/" + hostCode }}>
              <Button color="teal" onClick={hostGame}><Icon name='users'/>Host!</Button>
            </Link>
            <Button className="secondary"><Icon name='setting'/>Options</Button>
            <Button inverted color='red' onClick={() => setHostModalOpenStatus(false)}><Icon name='remove' />Close</Button>
          </Modal.Actions>
        </Modal>
      </div>

      {/* Bottom Third */}
      <div className="joinScreenBottomThird">
        <p>&#169; 2021 Game Foot Inc.</p>
        <p>gamefootbusiness@gmail.com</p>
        <div className="twitter">
          <img className="twitterPic" src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/twitter-128.png" alt="r"></img>
          <p>&nbsp; @GameFootInc1</p>
        </div>
      </div>
    </div>
  );
}

export default JoinScreen;
