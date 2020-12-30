// Component that properly displays a player's name, picture and color.

import '../styles/styles.css';
import { PLAYER_COLORS } from "../styles/PlayerColors.js";

function PlayerIcon (props) {

  return (
      <div className="playerIcon" style={{backgroundColor: PLAYER_COLORS[props.index]}}>
          <p className="playerIconName">{props.playerName}</p>
          <img className="playerIconPicture" src="https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?fit=300%2C300"></img>
      </div>
  );
}

export default PlayerIcon;