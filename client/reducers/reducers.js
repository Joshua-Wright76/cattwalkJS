import { combineReducers } from 'redux';
import * as actions from './../actions.js'
import { NEW_PIECE, CHECK_LONG, UNCHECK } from '../actions.js';
import { connect } from 'http';
const initialState = {
    gameData: {
        ip: '',
        name: '',
        players: '',
        gameState: 'Lobby',
    }, 
    boardData: {
        grain: 50,
        redField: 6,
        blueField: 6,
        centerField: 6,
        bodyHeight: 6,
        topField: 1,
        bottomField: 1,
        pieces: [],
        speculations: [],
        checking: false,
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case NEW_PIECE:
            let newStateNP = JSON.parse(JSON.stringify(state));


            let pieceImgSources = 
            ['B0 (CALLISTO)', 'B1 (DEIMOS)', 'B2 (EUROPA)', 'B3 (GANYMEDE)', 'B4 (IO)', 'B5 (LUNA)', 'B6 (TITAN)', 'B7 (SOL)',
             'R0 (CALLISTO)', 'R1 (DEIMOS)', 'R2 (EUROPA)', 'R3 (GANYMEDE)', 'R4 (IO)', 'R5 (LUNA)', 'R6 (TITAN)', 'R7 (SOL)',];

            let img = '../../assets/' + pieceImgSources[state.boardData.pieces.length] + '.png'
            console.log(img);


            let pieceOb = {
                pieceType: action.pieceType,
                pos: {x: action.pos[0], y: action.pos[1]},
                img: img,
                team: action.team
            }


            newStateNP.boardData.pieces.push(pieceOb);
            return newStateNP;
        
        case UNCHECK:
            let newStateUC = JSON.parse(JSON.stringify(state));
            console.log('unchecking from actions!', Array.isArray(newStateUC.speculations));
            newStateUC.speculations.splice(0)
            return newStateUC;

        
        case CHECK_LONG:

            let newStateCL = JSON.parse(JSON.stringify(state));
            let pos = action.pos;
            let options = [];
            let isKing = action.isKing;
            let xColinears = [[],[]]; //greater & lesser
            
            let yColinears = [[],[]];
            for(let i of state.boardData.pieces){

                if(i.pos.x === pos[0]){
                    if(i.pos.y > pos[1]){
                        yColinears[1].push(i);
                    } else if (i.pos.y < pos[1]) {
                        yColinears[0].push(i);
                    }
                }
                if(i.pos.y === pos[1]){
                    if(i.pos.x > pos[0]){
                        xColinears[1].push(i);
                    } else if(i.pos.x < pos[0]) {
                        xColinears[0].push(i);
                    }
                }
            }

            console.log('south before sorting: ', yColinears[1]);
            let west  = xColinears[0].sort((a,b)=>{return a.pos.x < b.pos.x}); //sort all the lists of colinears
            let east  = xColinears[1].sort((a,b)=>{return a.pos.x > b.pos.x});
            let north = yColinears[0].sort((a,b)=>{return a.pos.y < b.pos.y});
            let south = yColinears[1].sort((a,b)=>{return a.pos.y > b.pos.y});
                
            //-------------STARTING FREE REAL ESTATE CONTROL FLOWS------------------------------

            if(west.length === 0){
                console.log('can go west to the edge of the board')
                for(let i = pos[0] - 50; i>=0; i-=50){
                    options.push([i, pos[1]]);
                }
            }

            let b = state.boardData;

            let wholeWidth = b.blueField + b.redField + b.centerField;
            let wholeHeight = b.topField + b.bodyHeight + b.bottomField;

            if(east.length === 0){
                console.log('can go east to the edge of the board');
                for(let i = pos[0] + 50; i<wholeWidth*50; i+=50){
                    options.push([i, pos[1]]);
                }
            }

            if(north.length === 0){
                console.log('can go north to the edge of the board');
                for(let i = pos[1] - 50; i>=0; i-=50){
                    options.push([pos[0], i]);
                }
            }

            if(south.length === 0){
                console.log('can go south to the edge of the board');
                for(let i = pos[1] + 50; i<wholeHeight*50; i+=50){
                    options.push([pos[0], i]);
                }
            }

            //-------------ENDING FREE REAL ESTATE CONTROL FLOWS--------------------------------
            //-------------STARTING TWO PUSH CONTROL FLOWS--------------------------------------

            if(west.length >= 2){
                if(Math.abs(west[1].pos.x - west[0].pos.x) === 50){
                    for(let i = pos[0] - 50; i > west[0].pos.x; i-=50){
                        options.push([i, pos[1]]);
                    }
                } else {
                    west.splice(1);
                }
            }

            if(east.length >= 2){
                if(east[1].pos.x - east[0].pos.x === 50){
                    for(let i = pos[0] + 50; i < east[0].pos.x; i+= 50){
                        options.push([i, pos[1]])
                    }
                } else {
                   east.splice(1);
                }
            }

            if(north.length >= 2){
                if(Math.abs(north[0].pos.y - north[1].pos.y) === 50){
                    for(let i = pos[1] - 50; i > north[0].pos.y; i -= 50){
                        options.push([pos[0], i]);
                    }
                } else {
                    north.splice(1)
                }
            }

            if(south.length >= 2){
                console.log('Two whole cowboys in the entire south? Show me!', south);
                if(south[1].pos.y - south[0].pos.y === 50){
                    for(let i = pos[1] + 50; i < south[0].pos.y; i += 50){
                        options.push([pos[0], i]);
                    }
                } else {
                    south.splice(1);
                }
            }

            //-------------ENDING TWO PUSH CONTROL   FLOWS--------------------------------------
            //-------------STARTING ONE PUSH CONTROL FLOWS--------------------------------------

            if(west.length === 1){
                console.log('crunch time in the west!')
                for(let i = pos[0] - 50; i >= west[0].pos.x; i -= 50){
                    options.push([i, pos[1]]);
                }
            }

            if(east.length === 1){
                console.log('crunch time in the east!')
                for(let i = pos[0] + 50; i <= east[0].pos.x; i += 50){
                    options.push([i, pos[1]]);
                }
            }

            if(north.length === 1){
                console.log('crunch time in the north!')
                for(let i = pos[1] - 50; i >= north[0].pos.y; i -= 50){
                    options.push([pos[0], i]);
                }
            }

            if(south.length === 1){
                console.log('crunch time in the south!');
                for(let i = pos[1] + 50; i <= south[0].pos.y; i+= 50){
                    options.push([pos[0], i]);
                }
            }

            //-------------ENDING   ONE PUSH CONTROL FLOWS--------------------------------------

            for(let i of options){
                newStateCL.boardData.speculations.push(i);
            }

            console.log('new state: ', newStateCL);

            return newStateCL;


        default: return state;
    }
}


export default reducer;