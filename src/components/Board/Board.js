import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Cell from '../Cell/Cell';
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            secondsElapsed: 0
        }

        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        if ( this.props.totalOpened === 0 && nextProps.totalOpened > 0 ) {
            this.startTimer();
        }
        
        if ( !this.props.completed && nextProps.completed && nextProps.gameOver ) {
            this.gameCompleted();
        }
        
        if ( !this.props.gameOver && nextProps.gameOver && !nextProps.completed ) {
            this.gameEnded();
        }
    }
    
    gameCompleted() {
        this.stopTimer();
    }
    
    gameEnded() {
        this.stopTimer();
    }
    
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    
    startTimer() {
        this.intervalId = setInterval(() => {
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            });
        }, 1000);
    }
    
    stopTimer() {
        clearInterval(this.intervalId);
        
        this.setState({
            secondsElapsed: this.state.secondsElapsed
        });
    }
    
    restartGame() {
        this.props.appActions.newGame();
        
        clearInterval(this.intervalId);
        
        this.setState({
            secondsElapsed: 0
        })
    }
    
    handleContextMenu(event) {
        event.preventDefault();
    }

    handleRightClick(event, cell) {
        event.preventDefault();
        
        if ( (this.props.minesLeft === 0 && cell.flagged) || this.props.minesLeft > 0 ) {
            this.props.boardActions.flagCell(cell);        
        }
    }
    
    handleLeftClick(_event, cell) {
        // user must remove flag before being able to open
        if ( !cell.flagged && !this.props.gameOver) {
            this.props.boardActions.openCell(cell);
        }
    }

    render() {
        return (
            <div className="board">
                <div className="board__header">
                    <div className="counter"><span className="pill">{this.props.minesLeft}</span> <span className="board__subheading">Mines Remaining</span></div>
                    <div className="counter"><span className="pill">{this.state.secondsElapsed}</span> <span className="board__subheading">Time Elapsed</span></div>
                </div>
                <p className="align--center"><button className="button" onClick={this.restartGame.bind(this)}>Restart</button></p>
                <div className="board__grid" onContextMenu={this.handleContextMenu}>
                    {
                        this.props.board &&
                        this.props.board.map((row, index) => {
                            return (
                                <div key={index} className="row">
                                    {row.map((cell, index) => {
                                        return (
                                            <Cell
                                                key={index}
                                                onFlag={e => this.handleRightClick(e, cell)}
                                                onClick={e => this.handleLeftClick(e, cell)}
                                                onBlur={this.props.onMouseUp}
                                                onFocus={this.props.onMouseDown}
                                                opened={cell.get('opened')}
                                                flagged={cell.get('flagged')}
                                                hasMine={cell.get('hasMine')}
                                                adjacentCellMineCount={cell.get('adjacentCellMineCount')}
                                                gameOver={this.props.gameOver}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })
                    }
                    {
                        this.props.completed && this.props.gameOver &&
                        <div className="alert">
                            <div className="alert__inner">
                                <h2>You Won!</h2>
                                <p><button className="button" onClick={this.restartGame.bind(this)}>Play Again</button></p>
                            </div>
                        </div>
                    }
                    
                    {
                        !this.props.completed && this.props.gameOver &&
                        <div className="alert">
                            <div className="alert__inner">
                                <h2>Game over.</h2>
                                <p><button className="button" onClick={this.restartGame.bind(this)}>Play Again</button></p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

Board.defaultProps = {
    onMouseDown() {},
    onMouseUp() {},
    gameOver: false,
    mineCount: 10,
    columns: 9,
    rows: 9
};

Board.propTypes = {
    rows: PropTypes.number,
    columns: PropTypes.number,
    mineCount: PropTypes.number,
    completed: PropTypes.bool,
    gameOver: PropTypes.bool,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    className: PropTypes.string
};

export default Board;