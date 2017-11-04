import React, {Component} from 'react';

import logo from '../wayup-white.svg';
import './App.css';
import BoardContainer from '../components/Board/BoardContainer';

class App extends Component {
    componentDidMount() {
        this.props.actions.newGame();
    }

    render() {
        return (
            <div className="app">
                <header className="header" role="banner">
                    <div className="header__wrapper">
                        <img src={logo} className="header__logo" alt="WayUp logo"/>
                        <h1 className="header__text">Minesweeper</h1>
                    </div>
                </header>
                <main role="main">
                    <div className="container">
                        <BoardContainer />
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
