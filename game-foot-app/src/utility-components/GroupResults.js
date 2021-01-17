// Our Stylings
import '../styles/styles.css';
import { PLAYER_COLORS } from "../styles/PlayerColors.js";
// Components
import PlayerIcon from "../utility-components/PlayerIcon.js";
// React Stuff
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "../../node_modules/react-beautiful-dnd"
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function GroupResults (props) {

  const [displayScore, setDisplayScore] = useState(-1);
  const [returnHomeModalOpenState, setReturnHomeModalOpenState] = useState(false);

  const calculatePlacingText = (place) => {
    switch (place) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      default:
        return place + "th";
    }

  }

    return (
        <div className="groupResultsScreen">
          <div className="groupResultsScreenTop">
            <p className="howDidYouStackUp">HOW DID YOU STACK UP?</p>
          </div>
          <div className="groupResultsScreenMiddle">
            {props.props.rankingsState.map((playerInfo, index) => (
              (playerInfo[2] === true) ? 
              <div onMouseOver={() => setDisplayScore(index)} onMouseOut={() => setDisplayScore(-1)}>
                <p className="playerRankOrScore">
                  {displayScore === index ? "_____ pts" : calculatePlacingText(index + 1)}
                </p>
                <PlayerIcon lobby={false} key={index} index={index} playerName={playerInfo[0]}/> 
              </div>
              : null
            ))}
          </div>
          <div className="groupResultsScreenBottom">

          <Modal
              basic
              onClose={() => setReturnHomeModalOpenState(false)}
              onOpen={() => setReturnHomeModalOpenState(true)}
              open={returnHomeModalOpenState}
              size='small'
              trigger={<div><button className="ui icon button massive darkClickButton" ><Icon name='hand peace' /></button></div>}>
              <Header icon><Icon className='large exclamation triangle' />
                <br></br>
                Are you sure you want to leave this game?
              </Header>
              <Modal.Actions className="joinScreenModalButtonContainer">
                <Link to={{ pathname: "/" }}>
                  <Button color="teal" onClick={() => setReturnHomeModalOpenState(false)}>Yes</Button>
                </Link>
                <Button inverted color='red' onClick={() => setReturnHomeModalOpenState(false)}>No</Button>
              </Modal.Actions>
            </Modal>

            <Link to={{ pathname: "/game/" + props.props.gameCode }}>
              <Button className="massive darkClickButton" onClick={() => props.props.setRoundsPassed(props.props.roundsPassed + 1)}>
                Next Round<Icon name="arrow right"></Icon>
              </Button>
            </Link>

          </div>
          
        </div>
     );
   }

export default GroupResults;