import React, { Component } from 'react';
import checkerboard from '../tools/checkerboard';
import Piece from '../components/piece.jsx'
import Speculation from '../components/speculations.jsx'
import { uncheck } from '../actions';

const Board = (props) => {
    let b = props.boardData;

    let wholeWidth = b.blueField + b.redField + b.centerField;

    let wholeHeight = b.topField + b.bodyHeight + b.bottomField;

    let redFieldBG = checkerboard(b.redField, b.bodyHeight, '#ff6961', '#b20000', b.grain)
    let blueFieldBG = checkerboard(b.blueField, b.bodyHeight, '#031f7c', '#819dfc', b.grain);
    let centerFieldBG = checkerboard(b.centerField, b.bodyHeight, '#aaaaaa', '#cccccc', b.grain);
    let topFieldBG = checkerboard(wholeWidth, b.topField, '#333333', '#222222', b.grain);
    let bottomFieldBG = checkerboard(wholeWidth, b.topField, '#333333', '#222222', b.grain);

    let topShelfStlye = {display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                         width: wholeWidth*b.grain, height: b.topField*b.grain, zIndex: -1}

    let bottomShelfStlye = {display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                            width: wholeWidth*b.grain, height: b.bottomField*b.grain, zIndex: -1}

    let bodyStyle = {display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                     width: wholeWidth*b.grain, height: b.bodyHeight*b.grain, zIndex: -1}

    let boardStyle = {display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      width: wholeWidth*b.grain, height: wholeHeight*b.grain, zIndex: -1, position: 'absolute'}

    let piecesHolderStyle = {width: wholeWidth*b.grain, height: wholeHeight*b.grain, position: 'relative'}

    let pieceElements = [];
    for(let i of props.boardData.pieces){
        pieceElements.push(<Piece grain={props.boardData.grain} pos={i.pos}
                                         team = {i.team} img={i.img} pieceType={i.pieceType}/>)
    }

    let specElements = [];
    for(let i of props.boardData.speculations){
        specElements.push(<Speculation pos = {i} boardData = {b}/>);
    }

    

    function pieceControllerFunction(click){
        let pos = [Math.floor(click.clientX/b.grain)*b.grain, Math.floor(click.clientY/b.grain)*b.grain]
        let uniquePos = true;

        if(b.speculations.length === 0){
            for(let i of props.boardData.pieces){
                if(i.pos.x === pos[0] && i.pos.y === pos[1]){
                    uniquePos = false;
                    props.checkLong(pos, false);
                }
            }
            
            if(uniquePos) props.newPiece('pawn', pos, 'blue', click);
        } else {
            props.uncheck();
        }
        
        
    }

    let el = 
    <div style = {piecesHolderStyle} onMouseDown={pieceControllerFunction}>
        
        <div style = {boardStyle}>
            <div style={topShelfStlye}>
                {topFieldBG}
            </div>
            <div style = {bodyStyle}>
                {redFieldBG}
                {centerFieldBG}
                
                {blueFieldBG}
            </div>
            <div style={bottomShelfStlye}>
                {bottomFieldBG}
            </div>
        </div>
        {specElements}
        {pieceElements}
    </div>
    

    return el
}

export default Board;