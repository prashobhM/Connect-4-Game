import React from 'react'
import {
  Game_state_Draw,
  Game_state_Playing,
  Game_state_Win,
  } from "../Constants";

const Header = ({gameState,currentPlayer,winPlayer}) => {
   const renderLabel =()=>{
      switch(gameState){
        case Game_state_Playing:
          return <div>Player {currentPlayer} Turn</div>
        case Game_state_Win:
          return <div>Player {winPlayer} WINS</div>
        case Game_state_Draw:
          return <div>It's a Draw!!!</div>  
        default:
    }
  }
  return (
    <div className="panel header">
    <div className="header-text">{renderLabel()}</div>     
    </div>
  )
}

export default Header;
