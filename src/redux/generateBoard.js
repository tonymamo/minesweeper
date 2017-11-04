import {fromJS, List, Record} from 'immutable';

function fillArray(length, fn) {
    return Array.apply(null, new Array(length)).map(fn);
}

export const Cell = Record({
    rowIndex: -1,
    columnIndex: -1,
    hasMine: false,
    flagged: false,
    opened: false,
    adjacentCells: List(),
    adjacentCellMineCount: 0
});

export default({columns, rows}) => {
    const boardJS = fillArray(rows, (_row, rowIndex) => {
        return fillArray(columns, (_column, columnIndex) => {
            return Cell({rowIndex, columnIndex});
        });
    });

    return fromJS(boardJS);
};
