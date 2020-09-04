import React, {useEffect, useRef} from 'react';
import socketIOClient from 'socket.io-client';
import Cell from './Cell';
import GameOver from './GameOver';
import _ from 'lodash'

const DIRECTIONS = {
    UP: 'U',
    RIGHT: 'R',
    DOWN: 'D',
    LEFT: 'L',
}


export default function Board() {
    const ioClientRef = useRef(null);
    const [cells, setCells] = React.useState([]);
    const [gameOver, setGameOver] = React.useState(false);


    //todo clean up socket
    useEffect(() => {

        ioClientRef.current = socketIOClient(process.env.REACT_APP_SERVER_SOCKET_URL, {
            autoConnect: false,
            reconnection: false
        });
        ioClientRef.current.on('connect', () => {
            console.log('connect')
        });

        ioClientRef.current.on('boardUpdated', newBoard => {
            if (_.isArray(newBoard)) {
                setCells(newBoard)
            }
        });
        ioClientRef.current.on('disconnect', () => {
            console.log('disconnect')
            endGame();
        });

        startGame();

        return () => ioClientRef.current.disconnect();
    }, []);


    const startGame = () => {
        ioClientRef.current.open();

    };
    const endGame = () => {
        setGameOver(true);
    };

    const restartGame = () => {
        startGame();
        setGameOver(false);
    };

    const handleKeyDown = (e) => {
        if (!ioClientRef.current) return;
        const code = e['code'];
        if (code === 'ArrowUp') {
            ioClientRef.current.emit('keydown', {direction: DIRECTIONS.UP, id: ioClientRef.current.id})
        }
        if (code === 'ArrowDown') {
            ioClientRef.current.emit('keydown', {direction: DIRECTIONS.DOWN, id: ioClientRef.current.id})
        }
        if (code === 'ArrowRight') {
            ioClientRef.current.emit('keydown', {direction: DIRECTIONS.RIGHT, id: ioClientRef.current.id})
        }
        if (code === 'ArrowLeft') {
            ioClientRef.current.emit('keydown', {direction: DIRECTIONS.LEFT, id: ioClientRef.current.id})
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div className="board-body">
            {gameOver ? <GameOver callBack={restartGame}/> :
                cells.map((cell) => {
                        return <Cell key={cell.id} bgColor={cell.bgColor} id={cell.id}/>
                    }
                )
            }
        </div>
    );
}