import React from 'react'
import { Component } from 'react';
import Board from  './containers/board.jsx'
import { connect } from 'react-redux'
import * as actions from './actions'


const mapStateToProps = store => {
    return {boardData: store.boardData, gameData: store.gameData};
};

const mapDispatchToProps = dispatch => ({
    newPiece: (kind, pos, team) => {
        console.log('dispatching new piece action!')
        dispatch(actions.newPiece(kind, pos, team))
    },
    checkLong: (pos, team, isKing) => {
        console.log('dispatching check long action!')
        dispatch(actions.checkLong(pos, isKing))
    },
    uncheck: () => {
        console.log('unchecking!');
        dispatch(actions.uncheck());
    }
})

class App extends Component {
    constructor(props){
        super(props)
        console.log('app properties: ', this.props);
    }
    
    render(){
        return (
            <div>
                <Board uncheck={this.props.uncheck} 
                       boardData={this.props.boardData}
                       newPiece={this.props.newPiece}
                       checkLong={this.props.checkLong}/>
            </div>
        )
    }
}

let temp = connect(mapStateToProps, mapDispatchToProps)(App);

console.log('connect from inside app.jsx', temp);

export default temp

// module.exports = {
//     App: connect(mapStateToProps)(App)
// }