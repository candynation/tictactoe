/**
 * Created by Ka Yan Candy Chan 
 * Feb 7th, 2023 
 * 
 *  */ 

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,Pressable,Button } from 'react-native';


interface ITicTacToeProps {}
var playerX:number[]=[];
var playerO:number[]=[];
var availableNumberSet=new Set([0,1,2,3,4,5,6,7,8]);
let computer:boolean = false; 
let computerChoice:number=0;
let win:boolean = false;

const TicTacToe: React.FC<ITicTacToeProps> = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState<any[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<any>('X');
  const [winState, setwinState] = useState<boolean>(false);
  const [computerState, setComputerState] = useState<boolean>(true);
  const [computerButtonText, setComputerButtonText] = useState<string>('Play with Friend');
  const [playerXText, setPlayerXText] = useState<number>(0);
  const [playerOText, setPlayerOText] = useState<number>(0);
  const [winLoseText, setWinLoseText] = useState<String>(' ');
  const[restartText, setRestartText] = useState<String>('Restart');
  const solutionCombination:number[][] = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

  //let computerOpponent:boolean = false;
  
  const handlePress = (index: number) => {
   console.log("Computer State", computerState)
    if (board[index] === null) {
      takeTurn(index);
      if(computerState && availableNumberSet.size!=0 && win!=true) {
        
        // make computer pick from a spot or random selection of available spaces
        computer = true;
        if(findASpot(playerO)!=-1){
          computerChoice = findASpot(playerO);
        }
        else if(findASpot(playerX)!=-1){
          computerChoice = findASpot(playerX);
       }
        else
        {
          computerChoice = computerTurn(Math.floor(Math.random() * availableNumberSet.size)); 
        }
          takeTurn(computerChoice);
          computer = false;
      }
    }
    if (availableNumberSet.size==0 && win !=true)
    {
        setWinLoseText('Tie');
        setRestartText('Play Again');
    }

  };

  const takeTurn = (index: number) => {
    if (board[index] === null) {
      const nextPlayer = computer ? 'O' : currentPlayer;
      setBoard((prevBoard) => 
        prevBoard.map((value, i) => i === index ? nextPlayer : value)
          //if (i == index) then return nextplayer else return value;    
      );
      if (computer || currentPlayer==='O')
      {
        playerO.push(index);
       if (checkWinner(playerO)){
        setPlayerOText(playerOText+1);
        setWinLoseText('Player O Win')
        }
      }
      else if (currentPlayer==='X'){
        playerX.push(index); 
       if (checkWinner(playerX)){
          setPlayerXText(playerXText+1);
          setWinLoseText('Player X Win')
        }
      }

      if(!computerState) {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
      postTurn(index);
    }
  };
  const postTurn = (index: number) => {
      
      //console.log("Pressed",index);
      availableNumberSet.delete(index);
      //console.log("available number length:", availableNumberSet.size);
      //console.log("currentPlayer", computerOpponent && computer ? 'O' : currentPlayer);
  }


const checkWinner = (player:number[]) => {
  console.log("checking winner",win);
     for (let i = 0; i < solutionCombination.length; i++)
      {
        for (let j = 0; j< 3; j++)
        {
            //console.log( "i:", i, "j:",j, "number:",solutionCombination[i][j]);
            if (!player.includes(solutionCombination[i][j]))
            {
              break;
            }
            else if (j==2)
            {
              win = true;
              setwinState(true);
              setRestartText('Play Again');
             return true;
            }
       
          }
      }
};

const findASpot = (player:number[])=>{
  console.log("Find a spot",player);
  let potentialSpot:number =-1;
  let i=0;
  for (let i = 0; i < solutionCombination.length; i++)
   {
        // console.log( "i:", i, "number:",solutionCombination[i]);
       if(player.includes(solutionCombination[i][0])&&player.includes(solutionCombination[i][1])
            &&availableNumberSet.has(solutionCombination[i][2])){
        potentialSpot = solutionCombination[i][2];
                break;
       }
       else if (player.includes(solutionCombination[i][0])&&player.includes(solutionCombination[i][2])
              &&availableNumberSet.has(solutionCombination[i][1])){
        potentialSpot = solutionCombination[i][1];
        break;
       }
       else if (player.includes(solutionCombination[i][1])&&player.includes(solutionCombination[i][2])
              &&availableNumberSet.has(solutionCombination[i][0])){
        potentialSpot = solutionCombination[i][0];
        break;
       }
      
   }
  return potentialSpot;
}


const computerTurn = (computerNumber:number)=>{
    let count=0;
    let computerPressed=0;
    for (const x of availableNumberSet.values()) {
     if (count != computerNumber)
     {
      count+=1;
     }
    else {
      computerPressed= x;
      break;
    } 
    
    }
   // console.log("computer Pressed",computerPressed);
return computerPressed;
    
}

const handleComputerButton= () => {
  
  setComputerState(computerState === false ? true : false)
  setComputerButtonText(computerButtonText === 'Play with Computer'?'Play with Friend' : 'Play with Computer')
  setCurrentPlayer('X');
  handleRestart()
}
  
const handleRestart = () => {
    setBoard(
      board.map((value, i) => { return null; })
    );
    playerX=[];
    playerO=[];
    availableNumberSet=new Set([0,1,2,3,4,5,6,7,8]);
    win =false;
    setwinState(false)
    setRestartText('Restart');
    setWinLoseText(' ');
    //console.log("restart", playerO.length, playerX.length);
  }

  const handleReset = () => {
    setBoard(
      board.map((value, i) => { return null; })
    );
    playerX=[];
    playerO=[];
    availableNumberSet=new Set([0,1,2,3,4,5,6,7,8]);
    win =false;
    setwinState(false)
    setPlayerOText(0)
    setPlayerXText(0)
    setRestartText('Restart');
    setWinLoseText(' ');
   // console.log("reset", playerO.length, playerX.length);

  }
  

  return (
    <View style={styles.backgroundContainer}>
    <View nativeID='game-container' style={styles.gameContainer}>
      <View style={styles.container}>
      <View style= {styles.titleView}><Text style ={styles.titleText} >Tic Tac Toe</Text></View>
      <View style={styles.playerView}><Text style={styles.playerText}>Player X</Text>
          <Text style={styles.playerText}>{playerXText}</Text></View> 
          <View style={styles.playerView}><Text style={styles.playerText}>Player O</Text>
          <Text style={styles.playerText}>{playerOText}</Text></View> 
      <View style={styles.buttonView}>
        <TouchableOpacity  onPress={()=>handleComputerButton()} style={styles.button}>
          <Text style={styles.buttonText}>{computerButtonText}</Text></TouchableOpacity></View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={()=>handleRestart()} style={styles.button}>
          <Text style={styles.buttonText}>{restartText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleReset()} style={styles.button}>
          <Text style= {styles.buttonText}>Reset</Text></TouchableOpacity>
      </View>
      <View style= {styles.wiLoseView}><Text style ={styles.playerText} >{winLoseText}</Text></View>
      </View>
      <View nativeID='board-view' style={styles.boardView}>
        <View nativeID='board-container' style={styles.boardContainer}>
          {board.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tile}
              onPress={() => {handlePress(index);}}
              disabled={winState}
            >
              <Text style={styles.tileText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
    </View>
);
};


const styles = StyleSheet.create({

  backgroundContainer: {
    flex:1,
   backgroundColor:'lightblue',
   justifyContent: 'center',
   alignItems: 'center',
   width:'100%'
    
   },
   gameContainer: {
    width: 900,
    height: 600,

   },


  container: {
    flex:1.7,
    justifyContent: 'flex-end',
  },

  titleView: {
    flex:1.5,
    alignSelf: 'center'
  },

  playerView:{
    flex:0.5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginTop: 10,
    marginLeft: 200,
    marginRight: 200,
    justifyContent: 'space-evenly',

  },
  playerText:{
    fontSize: 13,
  },
  buttonView: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius:60,
    borderColor: 'yellow',
    borderWidth: 3,
  },
  buttonText: {
    fontSize: 15,
  },
  wiLoseView: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },

  boardView: {
    flex: 2,
    alignItems: 'center',
    padding: 30,
  },
  boardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    width:100,
    height:100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroudColor: 'red'
  },
  tileText: {
    fontSize: 10
    
  }, 
  titleText: {
    fontSize: 30,
   
  }
  });

export default TicTacToe;
