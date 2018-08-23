import React, { Component } from 'react'

const speculation = (props) => {
    let specStyle = {
        position: 'absolute',
        height: props.boardData.grain,
        width: props.boardData.grain,
        top: props.pos[1],
        left: props.pos[0],
        zIndex: 20,
    }
    let el = <img src="./../../assets/LongLine.png" style={specStyle}/>
    return el;
}

export default speculation