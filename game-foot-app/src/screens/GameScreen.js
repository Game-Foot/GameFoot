// Screen where players see the prompt and put in their individual votes.

// Our Stylings
import '../styles/styles.css';
// React Stuff
import React from "react";
import { DragDropContext, Droppable, Draggable } from "../../node_modules/react-beautiful-dnd"

function GameScreen () {

  // TEMPORARY - FIGURE OUT PASSING PLAYER DATA THROUGH PROPS/JSON FILE!
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

  const onDragEnd = (result) => {
    if (!result.destination) { return; }
    // Re-order list to reflect drag.
    let removed = players.splice( result.source.index, 1)[0];
    players.splice(result.destination.index, 0, removed);
  }

  const getListStyle = () => ({
    background: "var(--background1)",
    padding: "0.5%",
    width: 500
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 16,
    margin: `0 0 $8px 0`,
    // change background colour if dragging
    background: isDragging ? "var(--background3)" : "var(--background2)",
    // styles we need to apply on draggables
    ...draggableStyle
  });

  return (
      <div className="gameScreen">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="voteScreenDroppable">
            {(provided, snapshot) => (
              <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              >
                {players.map((playerName, index) => (
                  <Draggable key={index} draggableId={players.indexOf(playerName).toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {playerName}
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
  );
}

export default GameScreen;