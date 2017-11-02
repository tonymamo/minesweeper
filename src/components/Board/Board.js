import React, {Component} from 'react';
import './Board.css';

class Board extends Component {
    
    restartGame() {
        console.log('restarted');
    }
    
    render() {
        return (
            <div className="board">
                <div className="board__header">
                    <div className="mine-count">0</div>
                    <div className="restart"><button onClick={this.restartGame.bind(this)}>Restart</button></div>
                    <div className="clock">0</div>
                </div>
                <div className="board__grid">
                    
                </div>
            </div>
        );
    }
}

export default Board;