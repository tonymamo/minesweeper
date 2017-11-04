import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import bomb from './bomb.svg';
import flag from './flag.svg';
import './Cell.css';

class Cell extends Component {
    render() {
        const {flagged, opened, hasMine, gameOver, adjacentCellMineCount} = this.props;

        const className = classNames({
            'cell': true,
            'cell--opened': opened,
            'cell--mine': opened && hasMine
        });

        return (
            <div className={className} onClick={this.props.onClick} onContextMenu={this.props.onFlag}>
                {
                    !opened && flagged && !gameOver &&
                    <img src={flag} alt="flag" className="cell__image"/>
                }

                {
                    opened && !hasMine && adjacentCellMineCount > 0 &&
                    <span>{adjacentCellMineCount}</span>
                }

                {
                    ((hasMine && opened) || (hasMine && gameOver)) &&
                    <img src={bomb} alt="bomb" className="cell__image"/>
                }
            </div>
        );
    }
}

Cell.defaultProps = {
    flagged: false,
    hasMine: false,
    opened: false,
    adjacentCellMineCount: 0,
    onFlag() {}
};

Cell.propTypes = {
    flagged: PropTypes.bool,
    hasMine: PropTypes.bool,
    opened: PropTypes.bool,
    adjacentCellMineCount: PropTypes.number,
    onFlag: PropTypes.func
};

export default Cell;
