// Screen where players see the prompt and put in their individual votes.

// Our Stylings
import '../styles/styles.css';
import { PLAYER_COLORS } from "../styles/PlayerColors.js";
// React Stuff
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "../../node_modules/react-beautiful-dnd"
import { Modal, Icon, Header, Button } from 'semantic-ui-react';

function GameScreen () {

  var gameCode = window.location.href.substring(window.location.href.length - 4, window.location.href.length);
  var TIME_LIMIT = 90;

  const [lockAnswersModalOpenStatus, setLockAnswersModalOpenStatus] = useState(false);
  const [answersLocked, setAnswerLockStatus] = useState(false);
  const [time, setTime] = useState(TIME_LIMIT);

  // TEMPORARY - FIGURE OUT PASSING PLAYER DATA THROUGH PROPS/JSON FILE!
  let players = [
      ["RJ", 0],
      ["MetallicaFan420", 1],
      ["Arrjay", 2],
      ["Sleeves", 3],
      ["Paprino", 4],
      ["Zuniceratops", 5],
      ["NukedHyenas", 6],
      ["AipomMaster", 7],
    ]

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => { clearInterval(interval); };
  }, []);

  const getTimeLeft = () => {
    TIME_LIMIT--
    return TIME_LIMIT;
  }

  const lockAnswers = () => {
    let lockButton = document.getElementById("lockButton");
    setLockAnswersModalOpenStatus(false);
    setAnswerLockStatus(true);
    lockButton.innerHTML = "LOCKED";
    lockButton.classList.remove("darkClickButton");
    lockButton.classList.add("disabled");
  }
  
  const onDragEnd = (result) => {
    if (!result.destination || answersLocked) { return; }
    // Re-order list to reflect drag.
    let removed = players.splice( result.source.index, 1)[0];
    players.splice(result.destination.index, 0, removed);
  }

  const getItemStyle = (isDragging, draggableStyle, playerInfo, index) => ({
    padding: 20.2,
    margin: `0 0 11px 0`,
    background: isDragging ? "var(--background4)" : PLAYER_COLORS[playerInfo[1]],
    filter: answersLocked ? "grayscale(100%) brightness(0.6)" : (index < 3 ? "" : "grayscale(75%)"),
    ...draggableStyle
  });

  return (
      <div className="gameScreen">

        <div className="gameScreenLeft">
          <div className="gameScreenJoinMsg">
            <h3 className="gameJoinGameText">Join the fun!</h3>
            <p className="gameGameCodeText">{gameCode}</p>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="gameScreenQuestion">
            <p className="gameScreenFormat">FORMAT: TOP 3</p>
            <p className="gameScreenQuestionText">Who is the most likely to get laid this week?</p>
            <p className="timeRemaining"><Icon name='clock' />{time}</p>
          </div>
          <div className="ui divider"></div>

        </div>

        <div className="gameScreenRight">
          <p className="rankYourFriends">Rank your friends!</p>
          <div className="gameScreenDragContainer">
            <div className="gameScreenTop3Text">
              <p style={{marginBottom: "20%"}}>1st</p>
              <p style={{marginBottom: "20%"}}>2nd</p>
              <p>3rd</p>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="voteScreenDroppable">
                {(provided, snapshot) => (
                  <div className="draggableBoxBackground"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  >
                    {players.map((playerInfo, index) => (
                      <Draggable key={index} draggableId={players.indexOf(playerInfo).toString()} index={index}>
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
                      </Draggable>
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