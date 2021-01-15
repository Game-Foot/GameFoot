// Helper file that shows both user's individual results and the scores of each group member.

// Our Stylings
import '../styles/styles.css';
// Components
import IndividualResults from "../utility-components/IndividualResults.js";
import GroupResults from "../utility-components/GroupResults.js";
// React Stuff
import React, { useState } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';

function ResultsScreen (props) {

  var gameCode = window.location.href.substring(window.location.href.length - 4, window.location.href.length);
  const resultsMap = {
    "Individual": IndividualResults,
    "Group": GroupResults,
  }
  const [currentScreen, setCurrentScreen] = useState("Individual");

  // Render the proper screen.
  const renderScreen = () => {
    let TabElement = resultsMap[currentScreen];
    return (<TabElement props={props} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />)
  }

  return (
    <div className="resultsScreenContainer">
      {renderScreen()}

      
    </div>
  );
}

export default ResultsScreen;