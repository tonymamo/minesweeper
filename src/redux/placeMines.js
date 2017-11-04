function randomRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

/* List<Any>.getIn() without the wrapping behavior */
function getIn(grid, rowIndex, columnIndex) {
    if (rowIndex < 0 || columnIndex < 0) {
        /* out of bounds */
        return null;
    }

    const row = grid.get(rowIndex);

    if (!row) {
        return null;
    }

    return row.get(columnIndex) || null;
}

export default(board, {
    mineCount = 0,
    exclusions = []
}) => {
    return board.withMutations(mutatableBoard => {
        while (mineCount > 0) {
            const x = randomRange(0, mutatableBoard.size);
            const y = randomRange(0, mutatableBoard.get(0).size);
            const cell = getIn(mutatableBoard, x, y);

            if (cell && !cell.get('hasMine') && !exclusions.includes(`${x},${y}`)) {
                mutatableBoard.setIn([
                    x, y
                ], cell.set('hasMine', true));
                mineCount--;
            }
        }

        mutatableBoard.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const adjacentCells = [
                    getIn(mutatableBoard, rowIndex - 1, columnIndex),
                    getIn(mutatableBoard, rowIndex + 1, columnIndex),
                    getIn(mutatableBoard, rowIndex, columnIndex - 1),
                    getIn(mutatableBoard, rowIndex, columnIndex + 1),
                    getIn(mutatableBoard, rowIndex - 1, columnIndex + 1),
                    getIn(mutatableBoard, rowIndex - 1, columnIndex - 1),
                    getIn(mutatableBoard, rowIndex + 1, columnIndex - 1),
                    getIn(mutatableBoard, rowIndex + 1, columnIndex + 1)
                ].filter(c => c !== null);

                mutatableBoard.updateIn([
                    rowIndex, columnIndex
                ], cell => {
                    return cell.merge({
                        adjacentCells: adjacentCells.map(c => [c.get('rowIndex'), c.get('columnIndex')]),
                        adjacentCellMineCount: adjacentCells.map(c => c.get('hasMine')).filter(hasMine => hasMine === true).length
                    });
                });
            });
        });
    });
};
