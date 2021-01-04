// Screen where players see the prompt and put in their individual votes.

// Our Stylings
import '../styles/styles.css';
import { PLAYER_COLORS } from "../styles/PlayerColors.js";
// React Stuff
import React from "react";
import { DragDropContext, Droppable, Draggable } from "../../node_modules/react-beautiful-dnd"
import { Modal, Icon, Header } from 'semantic-ui-react';

function GameScreen () {

  let gameCode = window.location.href.substring(window.location.href.length - 4, window.location.href.length);
  let locked = false;

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

  const lockAnswers = () => {
    locked = true;
    let lockButton = document.getElementById("lockButton");
    lockButton.innerHTML = "LOCKED";
    lockButton.classList.remove("darkClickButton");
    lockButton.classList.add("disabled");
  }

  const onDragEnd = (result) => {
    if (!result.destination) { return; }
    // Re-order list to reflect drag.
    let removed = players.splice( result.source.index, 1)[0];
    players.splice(result.destination.index, 0, removed);
  }

  const getItemStyle = (isDragging, draggableStyle, playerInfo, index) => ({
    padding: 20.2,
    margin: `0 0 11px 0`,
    background: isDragging ? "var(--background4)" : PLAYER_COLORS[playerInfo[1]],
    filter: index < 3 ? "" : "grayscale(75%)",
    ...draggableStyle
  });

  return (
      <div className="gameScreen">

        <div className="gameScreenLeft">
          <div className="gameScreenJoinMsg">
            <h2 className="gameJoinGameText">Join the fun!</h2>
            <p className="gameGameCodeText">{gameCode}</p>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="gameScreenQuestion">
            <h1>FORMAT: TOP 3</h1>
            <h1 className="gameScreenQuestionText">Question 1: Who is the most likely to get laid this week?</h1>
          </div>
          <div className="ui divider"></div>

        </div>

        <div className="gameScreenRight">
          <p className="rankYourFriends">Rank your friends!</p>
          <div className="gameScreenDragContainer">
            <div className="gameScreenTop3Text">
              <p style={{marginBottom: "30%"}}>#1</p>
              <p style={{marginBottom: "30%"}}>#2</p>
              <p>#3</p>
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
                              index
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
            <button id="lockButton" className="ui button massive darkClickButton" onClick={lockAnswers}><Icon name="lock" />LOCK IN</button>
            <div className="gameScreenDivider ui divider"></div>
          </div>
        </div>
          
      </div>
  );
}

export default GameScreen;