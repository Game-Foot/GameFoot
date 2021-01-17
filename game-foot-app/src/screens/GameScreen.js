// Screen where players see the prompt and put in their individual votes.

// Our Stylings
import '../styles/styles.css';
import { PLAYER_COLORS } from "../styles/PlayerColors.js";
// React Stuff
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "../../node_modules/react-beautiful-dnd"
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

function GameScreen (props) {

  var TIME_LIMIT = 30;
  var WARNING_TIME = 7;
  var TIMER_DECREMENT_INTERVAL_MS = 1000;
  const [lockAnswersModalOpenStatus, setLockAnswersModalOpenStatus] = useState(false);
  const [answersLocked, setAnswerLockStatus] = useState(false);
  const [time, setTime] = useState(TIME_LIMIT);
  const [redirect, setRedirect] = useState(false);

  // Timer-Related Functions
  useEffect(() => {
    const timer = setInterval(() => { getTimeLeft(time - 1, timer); }, TIMER_DECREMENT_INTERVAL_MS);
    return () => clearInterval(timer);
  });

  const getTimeLeft = (time, timer) => {
    setTime(time);
    if (time === 0) { timeIsUp(timer) };
    return time;
  }

  const timeIsUp = (timer) => {
    clearInterval(timer);
    lockAnswers();
    document.getElementsByClassName("timeRemaining")[0].innerHTML = `<Icon name='clock' />0`;
    window.setTimeout(() => setRedirect(true), 2000);
  }
  
  // Drag & Drop Functions
  const onDragEnd = (result) => {
    if (!result.destination || answersLocked) { return; }
    // Re-order list to reflect drag.
    let playersStateCopy = [...props.rankingsState];
    let removed = playersStateCopy.splice( result.source.index, 1)[0];
    playersStateCopy.splice(result.destination.index, 0, removed);
    props.setRankingsState(playersStateCopy);
  }

  const getItemStyle = (isDragging, draggableStyle, playerInfo, index) => ({
    padding: 19,
    margin: `0 0 10px 0`,
    background: isDragging ? "var(--light)" : PLAYER_COLORS[playerInfo[1]],
    filter: answersLocked ? "grayscale(100%) brightness(0.6)" : (index < 3 ? "" : "grayscale(75%)"),
    ...draggableStyle
  })

  // Function for locking user's votes.
  const lockAnswers = () => {
    let lockButton = document.getElementById("lockButton");
    setLockAnswersModalOpenStatus(false);
    setAnswerLockStatus(true);
    lockButton.innerHTML = "LOCKED";
    lockButton.classList.remove("darkClickButton");
    lockButton.classList.add("disabled");
  }

  // Render JSX
  return (
      <div className="gameScreen">
        
        {/* Redirect when timer has finished. */}
        {redirect ? <Redirect to={"/results/" + props.gameCode}/> : null}

        <div className="gameScreenLeft">
          <div className="gameScreenJoinMsg">
            <h3 className="gameJoinGameText">Join the fun!</h3>
            <p className="gameGameCodeText">{props.gameCode}</p>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="gameScreenQuestion">
            <p className="gameScreenFormat">FORMAT: {props.questionList[0][0]}</p>
            <p className="gameScreenQuestionText">{props.questionList[0][1]}</p>
            <p className="timeRemaining" style={time <= WARNING_TIME ? {color: "red"} : {color: "white"}}><Icon name='clock' />{time}</p>
          </div>
          <div className="ui divider"></div>

        </div>

        <div className="gameScreenRight">
          <p className="rankYourFriends">Rank your friends!</p>
          <div className="gameScreenDragContainer">
            <div className="gameScreenTop3Text">
              <p style={{marginBottom: "25%"}}>1st</p>
              <p style={{marginBottom: "25%"}}>2nd</p>
              <p>3rd</p>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="voteScreenDroppable">
                {(provided, snapshot) => (
                  <div className="draggableBoxBackground"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  >
                    {props.rankingsState.map((playerInfo, index) => (
                      playerInfo[2] === true ? 
                      <Draggable key={index} draggableId={props.rankingsState.indexOf(playerInfo).toString()} index={index}>
                        {(provided, snapshot) => (
                          <div className="draggableItem"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              playerInfo,
                              index,
                            )}
                          >
                            {playerInfo[0]}
                          </div>
                        )}
                      </Draggable> : null
                    ))}
                    {provided.placeholder}
                  </div>
                )}
                </Droppable>
            </DragDropContext>
          </div>
          
          <div className="gameScreenBottomButton">
            <div className="gameScreenDivider ui divider"></div>
            <Modal
          basic
          onClose={() => setLockAnswersModalOpenStatus(false)}
          onOpen={() => setLockAnswersModalOpenStatus(true)}
          open={lockAnswersModalOpenStatus}
          size='small'
          trigger={<button id="lockButton" className="ui button massive darkClickButton"><Icon name="lock" />LOCK IN</button>}>
          <Header icon><Icon className='large lock' />
              Lock Answers
              <br></br>
              <br></br>
              Are you sure you want to lock in your answers?
          </Header>
          <Modal.Actions className="joinScreenModalButtonContainer">
            <Button color="teal" onClick={lockAnswers}><Icon name='check'/>Yes</Button>
            <Button inverted color='red' onClick={() => setLockAnswersModalOpenStatus(false)}><Icon name='close' />No</Button>
          </Modal.Actions>
        </Modal>
            <div className="gameScreenDivider ui divider"></div>
          </div>
        </div>
          
      </div>
  );
}

export default GameScreen;