import React, { useEffect } from "react";
import GameCircle from "./GameCircle";
import '../Game.css';
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { isDraw, isWinner, getRandomMove } from "../helper";
import {
    Game_state_Draw,
    Game_state_Playing,
    Game_state_Win,
    no_player,
    player_1,
    player_2,
    circlesNum,
    } from '../Constants';

const GameBoard = () =>{
    const [gameBoard, setGameBoard] = useState(Array(16).fill(no_player));
    const [currentPlayer, setCurrentPlayer] = useState(player_1);
    const [gamestate,setGameState]=useState(Game_state_Playing);    
    const [winPlayer,setWinPlayer]=useState(no_player);

    console.log(gameBoard);

    useEffect(()=>{
        initGame();
    }, []);

    const initGame=()=>{
       console.log("initialized");
        setGameBoard(Array(16).fill(no_player));
        setCurrentPlayer(player_1);
        setGameState(Game_state_Playing);
    }

    
    const suggestMove=()=>{
        circleClicked(getRandomMove(gameBoard));
    }

    const initBoard=()=>{
        const circlesArr =[]; 
    
        for(let i=0; i< circlesNum;i++){
            circlesArr.push(renderCircle(i));
        }
        return circlesArr;// for creating the circles 
    }

    const circleClicked=(id)=>{
    
        console.log('clicked '+id);

        if(gameBoard[id]!==no_player) return;//stops the toggling
        
        if(gamestate!==Game_state_Playing) return;//stops the game
        
        if(isWinner(gameBoard,id,currentPlayer)){
            setGameState(Game_state_Win);    
            setWinPlayer(currentPlayer);
        }

        if(isDraw(gameBoard,id,currentPlayer)){
            setGameState(Game_state_Draw);    
            setWinPlayer(no_player);
        }

        setGameBoard(prev=>{
            return prev.map((circle,pos)=>{
                if(pos===id) return currentPlayer;
                return circle;
            });//used for updating the array
        });
        setCurrentPlayer(currentPlayer === player_1 ? player_2 : player_1);//Toggle between players
        console.log(currentPlayer);
        console.log(gameBoard);
    }
    const renderCircle = id => {//start of the game
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked} />
}
    return(
    <> {/*Standard react Fragment as there are more  than one root components */}
        <Header gameState={gamestate} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
        <div className="GameBoard">
            {/*<GameCircle id={0} className={`player_${GameBoard[0]}}`} onCircleClicked={circleClicked}/> 
            {/*inline css is written using {{}}
            {/* <span style={{color: 'red'}}>red</span>
            react children: written by extending the imported thing*/}
            {initBoard()};    
        </div>
        <Footer onNewGameClick={initGame} onSuggestClick={suggestMove}/>
    </>
);}
export default GameBoard;