import React from 'react';


export default function GameOver(props) {

    function handleClick() {
        if(props.callBack){
            props.callBack();
        }
    }

    return (
        <div className="game-over" >
            Game over
               <br/>
            Do you want to continue ?
            <br/>
            <button      onClick={handleClick}>
                     YES
            </button>
        </div>
    );
}
