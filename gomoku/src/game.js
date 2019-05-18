import React, {Component} from 'react';
import Blank from './blank.js';
import './game.css';
class game extends Component
{
	
	
	constructor(props)
	{
		super(props);
		this.state=({
			newGame:true,
			player:1,
			chess:[],         //1 2 3 4 5 6...
			gameState:[],     // 0 0 0 0...
			chessBoard:[],     //Initially : 0 0 0 0...   After: 1 and 2
			click:[]
					});
		this.clickChess=this.clickChess.bind(this);
		this.checkWinner=this.checkWinner.bind(this);
		this.reset=this.reset.bind(this);
		
	}
	
	
	componentDidMount()  //only call once after the first render
	{
		//console.log("didmount");
		const initialChess=[];
		const initialGameState=[];
		const initialChessBoard=[];
		const initialClick=[];
		for(var i=0;i<196;i++)
		{
			initialGameState.push(0);
			initialChess.push(i);
			initialChessBoard.push(0);
			initialClick.push(false);
			
		}
		this.setState({
			chess:initialChess,
			game:initialGameState,
			chessBoard:initialChessBoard
		})
		
	}
	
	
	clickChess(position,whichPlayer)  //Identify which one is clicked
	{
		//console.log("position ",position);
		var newChessBoard=[...this.state.chessBoard];
		newChessBoard[position]=whichPlayer;
		var newClick=[...this.state.click];
		newClick[position]=true;
		if(this.state.player===1){
			this.setState({player:2,chessBoard:newChessBoard,newGame:false,click:newClick});
		}
		
	    if(this.state.player===2)
	   {
			this.setState({player:1,chessBoard:newChessBoard,newGame:false,click:newClick});
	   }
	}
	

	

	
	
	checkWinner()
	{
		for(var chessIndex=0;chessIndex<196;chessIndex++)
		{
			var thRow=Math.floor(chessIndex/14);
			var leftBound=thRow*14;
			var rightBound=(thRow+1)*14-1;
			var counter=0;
			if(this.state.chessBoard[chessIndex]!==0)  //first, can not be zero
			{
				
				for(var i=1;i<5;i++)
				{
					if(chessIndex+i<rightBound)
					{
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex+i]){counter++;}
						if(counter===4){return true;}
					}
				}
				counter=0; //reset the counter for each different kinds of test
				for(var i=1;i<5;i++)
				{
					if(chessIndex-i>leftBound)
					{
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex-i]){counter++;}
						if(counter===4){return true;}
					}
				}
				counter=0;
				for(var i=1;i<5;i++)
				{
					if(chessIndex+i*14<196)
					{
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex+i*14]){counter++;}
						if(counter===4){return true;}
					}
				}
				counter=0;
				for(var i=1;i<5;i++)
				{
					if(chessIndex-i*14>0)
					{
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex-i*14]){counter++;}
						if(counter===4){return true;}
					}
				}
				counter=0;
				
				for(var i=1;i<5;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*15>=newLeftBound&&chessIndex+i*15<=newRightBound)
					{
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex+i*15]){counter++;}
						if(counter===4){ return true;}
					}
				}
				
				
				counter=0;
				
				for(var i=1;i<5;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*13>=newLeftBound&&chessIndex+i*13<=newRightBound)
					{
						//if(chessIndex===20){console.log(chessIndex+i*13);console.log(this.state.chessBoard[chessIndex+i*13]);}
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex+i*13]){counter++;}
						if(counter===4){return true;}
					}
				}
				
			
				
				
				
				
		     } 
		}
		return false;
		
	}
	
	
	
	
	
	
	
	reset()
	{
		const initialClick=[];
		const initialChess=[];
		const initialGameState=[];
		const initialChessBoard=[];
		for(var i=0;i<196;i++)
		{
			initialGameState.push(0);
			
			initialChess.push
			(i);
			initialChessBoard.push(0);
			initialClick.push(false);
		}
		this.setState({
			newGame:true,
			player:1,
			chess:initialChess,        
			gameState:initialGameState,     
			chessBoard:initialChessBoard,
			click:initialClick
		});
		
	}
	
	
	
	
	
	
	
	
	render()
	{
		var playing='';
		var winner='';
		var finish=this.checkWinner();
		if(finish)
		{
		      if(this.state.player===2)
		      { winner="Player1 Win !!";}
			
			  if(this.state.player===1)
		      { winner="Player2 Win !!";}
		}
		if(!finish)
		{
			playing=<h1 style={{textAlign:'center'}}>Player {this.state.player}</h1>;
		}
		
		
		const displayChess=this.state.chess.map((i)=>{
			//console.log("chessBoard",this.state.chessBoard[i]);
			return <Blank key={i} position={i} clickChess={this.clickChess} player={this.state.player}
			          haveClicked={this.state.click[i]} newGame={this.state.newGame} finish={finish}  playerColor={this.state.chessBoard[i]}/>  });
		
		
		
		return(
			
			
		  <div>
		       {playing}
			    <h1 style={{textAlign:'center'}}>{winner}</h1>
			   <div id='allChess'>
			     {displayChess}
			   </div>
				<button onClick={this.reset}>Play Again!</button>   
		  </div>	
		);
		
				
	}
		
	
}


export default game;