// Splash screen that users will see upon loading the game page.

// Stylings
import '../styles/styles.css';
// React stuff
import React, { useState } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { Link, Redirect } from "react-router-dom";
// Images
import stackItUpLogo from '../img/SIU Logo 1.png';

function JoinScreen (props) {

  const [joinModalOpenStatus, setJoinModalOpenStatus] = useState(false);
  const [hostModalOpenStatus, setHostModalOpenStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const defaultProfilePic = "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?fit=300%2C300";

  const generateGameCode = () => {
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    props.setGameCode(code);
  }

  return (
    <div className="joinScreen">
      <div className="joinScreenTopThird"></div>

      <div className="joinScreenmiddleThird">
        <div style={{display: "flex", flexDirection: "column"}}>
        <Modal
          basic
          onClose={() => setJoinModalOpenStatus(false)}
          onOpen={() => setJoinModalOpenStatus(true)}
          open={joinModalOpenStatus}
          size='small'
          trigger={<button className="ui button massive darkClickButton" style={{marginBottom: "25%"}}>Join Game</button>}>
          <Header icon><Icon className='large user plus' />
              Join Game
              <br></br>
              <br></br>
              <div className="ui input">
                <input onKeyUp={(e) => props.setGameCode(e.target.value)} maxlength="4" type="text" placeholder="Enter room code..." style={{backgroundColor: "var(--light)"}}/>
              </div>
          </Header>
          <Modal.Actions className="joinScreenModalButtonContainer">
            <Link to={{ pathname: "/lobby/" + props.gameCode }}>
              <Button color="teal" onClick={() => setJoinModalOpenStatus(false)}><Icon name='user plus'/>Join!</Button>
            </Link>
            <Button inverted color='red' onClick={() => setJoinModalOpenStatus(false)}><Icon name='remove' />Close</Button>
          </Modal.Actions>
        </Modal>
        <Modal
          basic
          onClose={() => setHostModalOpenStatus(false)}
          onOpen={() => setHostModalOpenStatus(true)}
          open={hostModalOpenStatus}
          size='small'
          trigger={<button className="ui button massive darkClickButton" onClick={generateGameCode}>Host Game</button>}>
          <Header icon><Icon className='large users' />
              Host Game
              <br></br>
              <h1>Room Code: {props.gameCode}</h1>
          </Header>
          <Modal.Actions className="joinScreenModalButtonContainer">
            <Link to={{ pathname: "/lobby/" + props.gameCode }}>
              <Button color="teal" onClick={() => setHostModalOpenStatus(false)}><Icon name='users'/>Host!</Button>
            </Link>
            <Button inverted color='red' onClick={() => setHostModalOpenStatus(false)}>Close</Button>
          </Modal.Actions>
        </Modal>
        </div>

        <div className="stackItUpLogoContainer">
          <img className="stackItUpLogo" src={stackItUpLogo} alt="r"></img>
        </div>

        <div className="joinScreenUserOptionsContainer">
          <Icon className="settingsIcon massive" name='settings' />
          <br></br><br></br><br></br>
          <p className="joinScreenBigText">Set Username</p>
          <div className="ui input">
            <input type="text" maxLength="10" placeholder="Enter username..." onKeyUp={(e) => setUsername(e.target.value)} style={{backgroundColor: "var(--light)"}}/>
          </div>
          <p className="joinScreenBigText" style={{height: "4vh"}}>{username}</p>
          <br></br><br></br>
          <p className="joinScreenBigText">Upload Profile Picture</p>
          <div className="ui input">
            <input type="text" placeholder="Paste URL here" onKeyUp={(e) => setUserProfilePic(e.target.value)} style={{backgroundColor: "var(--light)"}}/>
          </div>
          <img className="joinScreenPic" src={userProfilePic === "" ? defaultProfilePic : userProfilePic} alt="r"></img>
        </div>
        
      </div>

      <div className="joinScreenBottomThird">
        <p>gamefootbusiness@gmail.com</p>   
        <div className="twitter">
          <img className="twitterPic" src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/twitter-128.png" alt="r"></img>
          <p>&nbsp; @GameFootInc1</p>
        </div>
        <p className="flag">*For legal reasons this is not the Pan-African flag</p>
      </div>

    </div>
  );
}

export default JoinScreen;
