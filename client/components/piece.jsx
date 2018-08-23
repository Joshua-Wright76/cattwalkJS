import React, { Component } from 'react';

const Piece = (props) => {
    let pos = props.pos;
    let team = props.team;
    let img = props.img;
    let id = props.id;
    let pieceType = props.pieceType;

    let pieceStyle = {position: 'absolute', left: pos.x, top: pos.y, width: props.grain, height: props.grain, zIndex: '10'}

    let el = (
        <img src={props.img} style={pieceStyle} className = "piece">

        </img>
    ) 
    return el;
};

export default Piece;