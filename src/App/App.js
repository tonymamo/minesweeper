import React, {Component} from 'react';
import logo from '../wayup-white.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <header className="header" role="banner">
                    <img src={logo} className="header__logo" alt="WayUp logo"/>
                    <h1>Minesweeper</h1>
                </header>
                <main role="main">
                    <div className="container">
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
