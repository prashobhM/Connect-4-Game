import React from 'react'
import '../Game.css';

const GameCircle = ({id,children,className,onCircleClicked}) => {
  return (
    <div  className={`gameCircle ${className}`}  onClick={()=>onCircleClicked(id)}>
      {/*the oncircleclicked is CALLBACK func which calls the funtion in parent class i.e gameboard,
       /*instead of using `(templating -for dynamic classes/scaling) we can just use style={id % 2 === 0 ? 
       {backgroundColor:'red'} :{backgroundColor:'blue'}} */}
      {children}
      </div>
  )
}

export default GameCircle;