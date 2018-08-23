

export const NEW_PIECE = 'NEW_PIECE';

export const MOVE_PIECE = 'MOVE_PIECE';

export const CHECK_SHORT = 'CHECK_SHORT';

export const CHECK_LONG = 'CHECK_LONG';

export const UNCHECK = 'UNCHECK';

export const newPiece = (pieceType = 'pawn', pos = [300, 300], team = 'blue') => {
    let ob = {
    type: NEW_PIECE,
    pieceType, pos, team
    }
    return ob;
}

export const checkLong = (pos, isKing) => {
    let ob = {
        type: CHECK_LONG,
        pos: pos,
        isKing: isKing,
    }
    return ob;
}

export const uncheck = () => {
    let ob = {
        type: UNCHECK,
    }
    return ob;
}
