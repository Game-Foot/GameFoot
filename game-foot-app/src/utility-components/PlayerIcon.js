// Component that properly displays a player's name, picture and color.

import '../styles/styles.css';
import { PLAYER_COLORS } from "../styles/PlayerColors.js";

function PlayerIcon (props) {

  const mouseOver = () => {
    document.getElementsByClassName("playerIcon")[props.index].classList.add("playerIconRising");
    document.getElementsByClassName("playerIcon")[props.index].classList.remove("playerIconFalling");
    document.getElementsByClassName("playerIconName")[props.index].style.fontWeight = "bold";
  }

  const mouseOut = () => {
    document.getElementsByClassName("playerIcon")[props.index].classList.add("playerIconFalling");
    document.getElementsByClassName("playerIcon")[props.index].classList.remove("playerIconRising");
    document.getElementsByClassName("playerIconName")[props.index].style.fontWeight = "normal";
  }

  return (
      <div className="playerIcon" style={{backgroundColor: PLAYER_COLORS[props.index]}} onMouseOver={mouseOver} onMouseOut={mouseOut}>
          <p className="playerIconName">{props.playerName}</p>
          {/* <img className="playerIconPicture" alt="r" src=
            {props.index != 0 ? 
              "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?fit=300%2C300" : 
              "https://st3.depositphotos.com/4326917/13731/v/450/depositphotos_137318506-stock-illustration-no-user-sign-illustration.jpg"
            }>
          </img> */}
          <img className="playerIconPicture" alt="r" src="https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?fit=300%2C300"></img>
      </div>
  );
}

export default PlayerIcon;