import React from 'react'
import './style.css'

function Box(props){
     //return <div className='box' draggable='true' onDrag={props.onStart} onDrop={props.onStop} >{ props.currentVal }</div>

    return <div className={props.currentVal === ''? 'noBox' : 'box'} draggable='true' onDrag={props.onStart} onDrop={props.onStop} >{ props.currentVal }</div>
}

export default Box
