import React, {Component} from 'react';
import './Board.css';

class Board extends Component {
    
    restartGame() {
        
    }

    render() {
        return (
            <div className="board">
                <div className="board__header">
                    <div><span className="pill">0</span> <span className="board__subheading">Mines Remaining</span></div>
                    <div><span className="board__subheading">Time Elapsed</span> <span className="pill">0</span></div>
                </div>
                <div className="restart">
                    <button onClick={this.restartGame.bind(this)}>Restart</button>
                </div>
                <div className="board__grid">
                    
                </div>
            </div>
        );
    }
}

export default Board;