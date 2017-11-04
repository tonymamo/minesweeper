import {List, Map} from 'immutable';

import * as types from '../constants';
import generateBoard from '../generateBoard';
import placeMines from '../placeMines';

function cellPosition(cell) {
    return [cell.get('rowIndex'), cell.get('columnIndex')];
}

const initalState = Map({
    board: List(),
    completed: false,
    rows: 9,
    columns: 9,
    totalOpened: 0,
    mineCount: 10,
    minesLeft: 10,
    gameOver: false
});

export default(state = initalState, action) => {
    switch (action.type) {
        case types.START_GAME:
            return state.mergeDeep({
                gameOver: false, 
                minesLeft: state.get('mineCount'), 
                completed: false, totalOpened: 0}
            ).set('board', generateBoard({
                rows: state.get('rows'), 
                columns: state.get('columns'), 
                mineCount: state.get('mineCount')}
            ));

        case types.END_GAME:
            return state.merge({gameOver: true});

        case types.WIN_GAME:
            return state.merge({gameOver: true, completed: true});

        case types.PLACE_MINES:
            return state.update('board', board => {
                return placeMines(board, {
                    mineCount: state.get('mineCount'),
                    exclusions: action.exclusions
                });
            });

        case types.OPEN_CELL:
            return state.setIn([
                'board', ...cellPosition(action.cell),
                'opened'
            ], true).update('totalOpened', totalOpened => ++totalOpened);

        case types.ADD_FLAG:
            return state.setIn([
                'board', ...cellPosition(action.cell),
                'flagged'
            ], true).update('minesLeft', minesLeft => --minesLeft);

        case types.REMOVE_FLAG:
            return state.setIn([
                'board', ...cellPosition(action.cell),
                'flagged'
            ], false).update('minesLeft', minesLeft => ++minesLeft);

        default:
            return state;
    }
};
