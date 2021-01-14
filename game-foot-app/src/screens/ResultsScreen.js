// Where users see their voting results and how they stack up against other players.

// Our Stylings
import '../styles/styles.css';
import { PLAYER_COLORS } from "../styles/PlayerColors.js";
// Components
import PlayerIcon from "../utility-components/PlayerIcon.js";
// React Stuff
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "../../node_modules/react-beautiful-dnd"
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

function ResultsScreen (props) {

  var gameCode = window.location.href.substring(window.location.href.length - 4, window.location.href.length);

  return (
      <div className="resultsScreen">

          <div className="resultsScreenLeft">
            <p className="resultsScreenBigText">MATCHES</p>
            <div className="resultsScreenTopChoice" style={{backgroundColor: PLAYER_COLORS[props.rankingsState[0][1]]}}>
              <p className="topChoiceText">{props.rankingsState[0][0]}</p>
            </div>
            <p className="resultsScreenSmallText">Player A, Player C (+200)</p>
            <div className="resultsScreenTopChoice" style={{backgroundColor: PLAYER_COLORS[props.rankingsState[1][1]]}}>
            <p className="topChoiceText">{props.rankingsState[1][0]}</p>
            </div>
            <p className="resultsScreenSmallText">Nobody (+0)</p>
            <div className="resultsScreenTopChoice" style={{backgroundColor: PLAYER_COLORS[props.rankingsState[2][1]]}}>
            <p className="topChoiceText">{props.rankingsState[2][0]}</p>
            </div>
            <p className="resultsScreenSmallText">Player F (+100)</p>
            <br></br>
            <br></br>
            <p className="resultsScreenBigText">TOTAL: +300</p>
          </div>

          <div className="resultsScreenMiddle">
            <div className="resultsScreenVerticalDivider"></div>
            <PlayerIcon lobby={false} playerName={props.rankingsState[5][0]} index={3}></PlayerIcon>
          </div>

          <div className="resultsScreenRight">
            <p className="resultsScreenBigText">APPEARANCES</p>
            <p className="resultsScreenSmallText">1st) 2x (+60)</p>
            <p className="resultsScreenSmallText">1st) 1x (+20)</p>
            <p className="resultsScreenSmallText">1st) 0x (+0)</p>
            <p className="resultsScreenBigText">TOTAL: +80</p>
          </div>

      </div>
  );
}

export default ResultsScreen;