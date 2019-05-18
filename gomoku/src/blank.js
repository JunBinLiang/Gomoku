import React, {Component} from 'react';
import './blank.css'


class blank extends Component
{
	static defaultProps ={
		width : '30px',
		height: '30px',
		
		
	}
	
	constructor(props)
	{
		super(props);
		this.clickHandler=this.clickHandler.bind(this);
		this.state=({
			afterClick:false
		});
		
		
	}
	


    clickHandler(evt)
    {
		
		
		if(this.props.haveClicked||this.props.finish){
			return;
		}
		
	   const val=this.props.position;
		
	
	   this.setState({haveClicked:true,afterClick:true});
	   this.props.clickChess(this.props.position,this.props.player);  
	}
	
    componentDidMount(){
		//console.log("mount");
		
	}

   
  
	render()
	{
		//console.log(this.props.player);
		var playerColor='';
		
		if(this.props.playerColor===1&&this.state.afterClick)
		{
			playerColor='blackCircle';
		}
		if(this.props.playerColor===2&&this.state.afterClick)
		{
			playerColor='redCircle';
		}
		
		return(
			
			
		     <div className='chess' value={this.props.position}  onClick={this.clickHandler}>
			    
			   <div className={playerColor} >
			
			   </div>
		       
		     </div>
			
			
		);
		
			
			
		
	}
}
export default blank;