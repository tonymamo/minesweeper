import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as boardActionCreators from '../../redux/actions/board';
import * as appActionCreators from '../../redux/actions/app';
import Board from './Board';

class BoardContainer extends Component {
    render() {
        return <Board {...this.props}/>;
    }
}

function mapStateToProps(state) {
    return {
        board:          state.get('board'), 
        totalOpened:    state.get('totalOpened'), 
        minesLeft:      state.get('minesLeft'),
        completed:      state.get('completed'),
        gameOver:       state.get('gameOver')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        boardActions: bindActionCreators(boardActionCreators, dispatch),
        appActions: bindActionCreators(appActionCreators, dispatch)
    };
}

BoardContainer.propTypes = {
    boardActions: PropTypes.object,
    appActions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
