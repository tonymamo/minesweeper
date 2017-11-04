import * as types from '../constants';

function reveal(cell, {board, seen}) {
    if (!seen) {
        seen = [];
    }

    if (!seen.includes(cell)) {
        seen.push(cell);
    }

    if (cell.get('adjacentCellMineCount') > 0) {
        return seen;
    }

    cell.get('adjacentCells').map(coord => board.getIn(coord)).filter(adjacentCellMineCount => !seen.includes(adjacentCellMineCount) && !adjacentCellMineCount.get('flagged') && !adjacentCellMineCount.get('opened')).forEach(adjacentCellMineCount => reveal(adjacentCellMineCount, {board, seen}));

    return seen;
}

function openCellAction(cell) {
    return {type: types.OPEN_CELL, cell};
}

function isBoardComplete(board, totalOpened, mineCount) {
    if (!board || !board.size) {
        return false;
    }

    return board.get(0).size * board.size - totalOpened === mineCount;
}

export function openCell(cell) {
    return(dispatch, getState) => {
        if (cell.get('opened')) {
            return;
        }

        // set the mines up after the first click so you can never lose on the first click
        if (getState().get('totalOpened') === 0) {
            dispatch({
                type: types.PLACE_MINES,
                exclusions: [`${cell.get('rowIndex')},${cell.get('columnIndex')}`]
            });

            cell = getState().getIn(['board', cell.get('rowIndex'), cell.get('columnIndex')]);
        }

        if (cell.get('flagged')) {
            return dispatch(removeFlagAction(cell));
        }

        if (cell.get('hasMine')) {
            dispatch({type: types.OPEN_CELL, cell});
            dispatch({type: types.END_GAME});
        } else {
            reveal(cell, {board: getState().get('board')}).forEach(revealableCell => dispatch(openCellAction(revealableCell)));

            const state = getState();

            if (isBoardComplete(state.get('board'), state.get('totalOpened'), state.get('mineCount'))) {
                dispatch({type: types.WIN_GAME});
            }
        }
    };
}

function toggleFlagAction(cell) {
    if (cell.get('flagged')) {
        return removeFlagAction(cell);
    }

    return {type: types.ADD_FLAG, cell};
}

function removeFlagAction(cell) {
    return {type: types.REMOVE_FLAG, cell};
}

export function flagCell(cell) {
    return(dispatch, getState) => {
        const gameOver = getState().get('gameOver');

        if (!gameOver && !cell.get('opened')) {
            dispatch(toggleFlagAction(cell));
        }
    };
}
