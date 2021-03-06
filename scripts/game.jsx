import React from 'react';
import './style.css';
import {win,winDiag} from './func';
import Square from './square'


class Game extends React.Component{
    constructor(){
        super()
        this.state = {
            isClicked : false,
            condition : false,           
            squares: new Array(6).fill().map(() => new Array(7).fill(<div className = 'case fade'></div>)),
            mem: new Array(6).fill().map(() => new Array(7).fill(2)),
            player1 : {
              name : '',
              style : 'player1 fade',
              score : [0]
            },
            player2 : {
              name : '',
              style : 'player2 fade',
              score : [0]
            }              
        }                
        this.step = 0;
        this.count = 1; 
        this.rows = 6;
        this.columns = 7;
        this.message = '';
        this.flag = false;               
      }     
  
    game(i,j){
      const {isClicked,mem,player1,player2} = this.state          
      const rows = this.rows;
      const columns = this.columns;
      const squares = this.state.squares.slice(); 
      const col = (arr, n) => arr.map(x => x[n]);
      
              for (let value of col(mem,j)) {if (value !== 2 && mem[0][j] === 2)  (this.count++)+1}
              if (mem[rows-this.count][j] === 2){
                this.step++;
                this.setState({isClicked : !this.state.isClicked});                
                squares[rows-this.count][j] = <div className = {this.step % 2 === 0 ? player1.style : player2.style}></div> // div
                mem[rows-this.count][j] = +isClicked                
                this.count = 1                
              }             
                        

              for (let i = 0; i < rows; i++){
                for(let j = 0; j < columns; j++){ 
                  
                  player1.score += Math.max(winDiag(mem,1),Math.max(win(mem[i],1),win(col(mem,j),1)));
                  player2.score += Math.max(winDiag(mem,0),Math.max(win(mem[i],0),win(col(mem,j),0)));                               

                  if (win(mem[i],0) > 3 || win(col(mem,j),0) > 3 || winDiag(mem,0) > 3){                                         
                    this.message = 'Победил' + ' ' + player2.name
                    this.setState({condition : true});
                    this.flag = true;
                    break;                    
                  }
                  if (win(mem[i],1) > 3 || win(col(mem,j),1) > 3 || winDiag(mem,1) > 3){                                      
                    this.message = 'Победил' + ' ' + player1.name                    
                    this.setState({condition : true});
                    this.flag = true;
                    break;                       
                }                
                  if (this.step == rows * columns && !this.flag){
                    this.message = 'Ничья!';                 
                    this.setState({condition : true});
                    break;  
                }                      
              }     
            }
            console.log(this.state.condition)  
            this.setState({squares: squares}); 
            if(this.state.condition) if(!alert(this.message)){window.location.reload();}                                            
          };     
         
      matrix (rows,columns){                
          let arr = new Array();        
          for (let i = 0; i < rows; i++){
              arr[i] = new Array();
            for (let j = 0; j < columns; j++){
                 arr[i][j] =  <Square value = {this.state.squares[i][j]} key = {j}
                 onClick={() => {this.setState(this.game(i,j))}}/>                                          
            }
          }        
          return arr.map((e,i) => {return <div key={i} style = {{textAlign : 'center', float: 'left'}}>{e}</div>})
        }
  
        render(){          
            this.state.player1.name = this.props.p1;
            this.state.player2.name = this.props.p2;
            const {player1,player2,isClicked} = this.state;
           
  
            return <div>
                   <div>{this.matrix(this.rows, this.columns)}</div>
                   <div className = 'note'>
                     <h3>Ваш ход, {this.state.isClicked ? this.state.player1.name : this.state.player2.name}</h3><br/>
                     <p>{player1.name} : {Math.max(...player1.score)}</p>
                     <p>{player2.name} : {Math.max(...player2.score)}</p>                   
                     </div>
                     <div className = {isClicked ? 'display1' : 'display2'}>{this.message}</div>
                  </div>
        }
  }
     export default Game;
   
              


         
         
         
          
          