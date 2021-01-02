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
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    // test print
    console.log(result);
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
          <p>Game Screen!</p>
          <p>hey yea you the guy and the cool guy and the check out this cool dragging wow very nice and ha ha yeah very crispy and yeah and the uhhhh and the yep ha ha maybe</p>
          <p>this currently does not actually re-order anything because onDragEnd() is not configured to actually change the state of the list of players</p>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              >
                {players.map((playerName, index) => (
                  <Draggable key={index} draggableId={playerName} index={index}>
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