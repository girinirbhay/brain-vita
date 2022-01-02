import React, { useState } from "react";
import './style.css'
import Box from '../Box'

const board = [['', '', '0', '0', '0', '', ''], ['', '', '0', '0', '0', '', ''], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', ' ', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['', '', '0', '0', '0', '', ''], ['', '', '0', '0', '0', '', '']]

function Game() {

    const [boardState, setBoardState] = useState(board)
    const [dragPosition, setDragPosition] = useState({})
    
    //console.log()

    function onStartDrag(rIndex, cIndex) {
        //console.log('drag')
        setDragPosition({ r: rIndex, c: cIndex })
    }

    function allowDrop(e){   
        
        e.preventDefault()
    }

    function onStopDrag(rIndex, cIndex) {
        
        const newBoardState = [...boardState]
        //console.log('drop')
        if(dragPosition.r === Number([rIndex]) && [dragPosition.c] === Number([cIndex])){
            //do nothing because it is pickedup and kept same location
        }
        else{
        if(dragPosition.r === Number([rIndex])){
            if([dragPosition.c] < [cIndex] && (Number([cIndex]) - Number([dragPosition.c])) === 1){
                const midCol = Number([dragPosition.c]) + 1
                if(newBoardState[dragPosition.r][midCol] === '0'){
                    newBoardState[dragPosition.r][midCol] = ' '
                    newBoardState[dragPosition.r][dragPosition.c] = ' '
                    newBoardState[rIndex][cIndex] = '0'
                }
            } else if([dragPosition.c] > Number([cIndex]) && (Number([dragPosition.c]) - Number([cIndex])) === 1){
                const midCol = Number([dragPosition.c]) - 1
                if(newBoardState[dragPosition.r][midCol] === '0'){
                    newBoardState[dragPosition.r][midCol] = ' '
                    newBoardState[dragPosition.r][dragPosition.c] = ' '
                    newBoardState[rIndex][cIndex] = '0'
                }
            }
        }
        
        if(dragPosition.c === Number([cIndex])){
            if([dragPosition.r] < Number([rIndex])){
                const midRow = Number([dragPosition.r]) + 1
                if(newBoardState[midRow][dragPosition.c] === '0'){
                    newBoardState[midRow][dragPosition.c] = ' '
                    newBoardState[dragPosition.r][dragPosition.c] = ' '
                    newBoardState[rIndex][cIndex] = '0'
                }
            }else if([dragPosition.r] > Number([rIndex])){
                const midRow = Number([dragPosition.r]) - 1
                if(newBoardState[midRow][dragPosition.c] === '0'){
                    newBoardState[midRow][dragPosition.c] = ' '
                    newBoardState[dragPosition.r][dragPosition.c] = ' '
                    newBoardState[rIndex][cIndex] = '0'
                }
            }
        }
        setBoardState(newBoardState);
        //console.log('Finish');
    }
    }
    
    console.log('render')
    return <div id="game">
        {boardState.map(function (row, rowIndex) {
            return <div key={rowIndex} className="row">
                {row.map(function (cell, cellIndex) {
                    return <div key={`${rowIndex}${cellIndex}`} onDragOver={allowDrop}  onDrop={() => onStopDrag(rowIndex, cellIndex)}>
                    <Box 
                        onStart={() => onStartDrag(rowIndex, cellIndex)}
                        row={rowIndex} col={cellIndex} currentVal={cell} />
                    </div>
                })}
            </div>
        })}
    </div >
}

export default Game