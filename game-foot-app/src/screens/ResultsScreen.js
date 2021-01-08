// Where users see their voting results and how they stack up against other players.

// Our Stylings
import '../styles/styles.css';
import { PLAYER_COLORS } from "../styles/PlayerColors.js";
// React Stuff
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "../../node_modules/react-beautiful-dnd"
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

function ResultsScreen () {

  var gameCode = window.location.href.substring(window.location.href.length - 4, window.location.href.length);


  return (
      <div>
          Results Screen {gameCode}
      </div>
  );
}

export default ResultsScreen;