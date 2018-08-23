import React from 'react';

function checkerboard(COLS, ROWS, color1, color2, GRAIN){
    let board = [];

    let rowStyle = {display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: COLS*GRAIN,
                    height: GRAIN}
    
    for(let i=0; i<ROWS; i++){
        let row = [];
        for(let j=0; j<COLS; j++){
            let squareStyle = {backgroundColor: color1, display: 'inline-block', width: GRAIN+'px', height: GRAIN+'px'};

            (i+j) % 2 === 0 ? squareStyle.backgroundColor = color1 : squareStyle.backgroundColor = color2;

            row.push(<div style = {squareStyle}></div>)
        }
        board.push(<div style = {rowStyle}>{row}</div>);
    }

    let boardStyle = {display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      width: COLS*GRAIN, height: ROWS*GRAIN}

    return <div style = {boardStyle}>{board}</div>;
}

export default checkerboard;