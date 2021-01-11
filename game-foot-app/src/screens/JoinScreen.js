// Splash screen that users will see upon loading the game page.

// Stylings
import '../styles/styles.css';
// React stuff
import React, { useState } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";
// Images
import stackItUpLogo from '../img/SIU Logo 1.png';

function JoinScreen () {

  const [joinModalOpenStatus, setJoinModalOpenStatus] = useState(false);
  const [hostModalOpenStatus, setHostModalOpenStatus] = useState(false);
  const [uploadPicModalOpenStatus, setUploadPicModalOpenStatus] = useState(false);
  const [hostCode, setHostCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const defaultProfilePic = "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?fit=300%2C300";

  const joinGame = () => {
    setJoinModalOpenStatus(false);
  }

  const hostGame = () => {
    setHostModalOpenStatus(false);
  }

  const generateHostCode = () => {
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setHostCode(code);
  }

  return (
    <div className="joinScreen">

      <div className="joinScreenTopThird">
        <Modal
          basic
          onClose={() => setUploadPicModalOpenStatus(false)}
          onOpen={() => setUploadPicModalOpenStatus(true)}
          open={uploadPicModalOpenStatus}
          size='small'
          trigger={<button className="ui button icon massive optionsButton darkClickButton"><Icon name="setting"></Icon></button>}>
          <Header icon><Icon className='large settings' />Options</Header>
          <Modal.Content style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            Set Username
            <br></br><br></br>
            <div className="ui input">
              <input type="text" maxlength="12" placeholder="Enter username..." style={{backgroundColor: "var(--light)"}}/>
            </div>
            <br></br>
            Upload Profile Picture
            <br></br><br></br>
            <div className="ui input">
              <input type="text" placeholder="Paste URL here" onKeyUp={(e) => setUserProfilePic(e.target.value)} style={{backgroundColor: "var(--light)"}}/>
            </div>
            <br></br>
            <img className="joinScreenPic" src={userProfilePic === "" ? defaultProfilePic : userProfilePic} alt="r"></img>
          </Modal.Content>
          <Modal.Actions className="joinScreenModalButtonContainer">
            <Button color="teal" onClick={() => setUploadPicModalOpenStatus(false)}><Icon name='check' />OK</Button>
            <Button inverted color='red' onClick={() => setUploadPicModalOpenStatus(false)}><Icon name='remove' />Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>

      <div className="joinScreenmiddleThird">
        <Modal
          basic
          onClose={() => setJoinModalOpenStatus(false)}
          onOpen={() => setJoinModalOpenStatus(true)}
          open={joinModalOpenStatus}
          size='small'
          trigger={<button className="ui button massive darkClickButton">Join Game</button>}>
          <Header icon><Icon className='large user plus' />
              Join Game
              <br></br>
              <br></br>
              <div className="ui input">
                <input onKeyUp={(e) => setJoinCode(e.target.value)} maxlength="4" type="text" placeholder="Enter room code..." style={{backgroundColor: "var(--light)"}}/>
              </div>
          </Header>
          <Modal.Actions className="joinScreenModalButtonContainer">
            <Link to={{ pathname: "/lobby/" + joinCode }}>
              <Button color="teal" onClick={joinGame}><Icon name='user plus'/>Join!</Button>
            </Link>
            <Button inverted color='red' onClick={() => setJoinModalOpenStatus(false)}><Icon name='remove' />Close</Button>
          </Modal.Actions>
        </Modal>

        <div className="stackItUpLogoContainer">
          <img className="stackItUpLogo" src={stackItUpLogo} alt="r"></img>
        </div>

        {/* <div className="joinScreenUserOptions">
          <p className="joinScreenUsernameLabel">User Profile</p>
          <div className="ui input">
            <input type="text" width="35" maxlength="12" placeholder="Enter username..." style={{backgroundColor: "var(--light)"}}/>
          </div>
          <br></br>
          <img className="joinScreenPic" alt="r" src="https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?fit=300%2C300"></img>
          <br></br>
          <Modal
          basic
          onClose={() => setUploadPicModalOpenStatus(false)}
          onOpen={() => setUploadPicModalOpenStatus(true)}
          open={uploadPicModalOpenStatus}
          size='small'
          trigger={<button className="ui button large darkClickButton">Upload Picture</button>}>
          <Header icon><Icon className='large users' />
              Upload Profile Picture
              <br></br>
              <br></br>
              <div className="ui input"><input type="text" width="35" placeholder="Paste URL here" style={{backgroundColor: "var(--light)"}}/></div>
          </Header>
          <Modal.Actions className="joinScreenModalButtonContainer">
            <Button color="teal" onClick={() => setUploadPicModalOpenStatus(false)}><Icon name='picture' />Set Picture</Button>
            <Button inverted color='red' onClick={() => setUploadPicModalOpenStatus(false)}><Icon name='remove' />Cancel</Button>
          </Modal.Actions>
        </Modal>
        </div> */}
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

      <div className="joinScreenBottomThird">
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
