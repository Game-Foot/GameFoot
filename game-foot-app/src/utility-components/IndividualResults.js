// Our Stylings
import '../styles/styles.css';
import { PLAYER_COLORS } from "../styles/PlayerColors.js";
// Components
import PlayerIcon from "../utility-components/PlayerIcon.js";
// React Stuff
import React, { useState, useEffect } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

function IndividualResults (props) {

    let numPlayersToDisplay = 3;

    switch (props.props.questionList[props.props.roundsPassed][0]) {
      case "Top 3":
        numPlayersToDisplay = 3;
        break;
      case "Top 1":
        numPlayersToDisplay = 1;
        break; 
      case "Rank": 
        numPlayersToDisplay = 8;
        break;
    }

    return (
        <div className="individualResultsScreen">

        <div className="resultsScreenLeftI">
          <p className="resultsScreenBigText">MATCHES</p>
          {/* Display matches for each player that the user picked (number varies based on the question) */}
          {props.props.rankingsState.map((playerInfo, index) => (
              (index < numPlayersToDisplay) ?
              <div>
                <div className="resultsScreenTopChoice" style={{backgroundColor: PLAYER_COLORS[playerInfo[1]]}}>
                  <p className="topChoiceText">{playerInfo[0]}</p>
                </div>
                <p className="resultsScreenSmallText"><Icon name="user plus" /> Matches would go here.</p>
              </div>
               : null
            ))}
          <br></br>
          <br></br>
          <p className="resultsScreenBigText">TOTAL: +300</p>
        </div>

        <div className="resultsScreenMiddleI">
          <div className="resultsScreenVerticalDivider"></div>
          <Button className="huge darkClickButton" onClick={() => props.setCurrentScreen("Group")}>
            View Group Results<Icon name="arrow right"></Icon>
          </Button>
          <div className="resultsScreenVerticalDivider"></div>
        </div>

        <div className="resultsScreenRightI">
          <p className="resultsScreenBigText">APPEARANCES</p>
          <p className="resultsScreenSmallText"><Icon name="star" /> 1st) 2x (+60)</p>
          <p className="resultsScreenSmallText"><Icon name="star" /> 2nd) 1x (+20)</p>
          <p className="resultsScreenSmallText"><Icon name="star" /> 3rd) 0x (+0)</p>
          <p className="resultsScreenBigText">TOTAL: +80</p>
        </div>

    </div>
    );
  }
  
export default IndividualResults;