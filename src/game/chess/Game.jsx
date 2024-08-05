import { useState, useEffect } from 'react';
import { Chess } from 'chess.js'; // Make sure to import Chess from chess.js
import Rank from './board/Rank';
import File from './board/File';
import ChessBoard from './board/ChessBoard';
import './Game.css';

const Game = () => {
    const [chess, setChess] = useState(null);

    useEffect(() => {
        const game = new Chess();
        setChess(game);
    }, []);

    const newGame= () => {
        setChess(new Chess());
    };

    return (
        <section className='game-board'>
            <Rank></Rank>
            <ChessBoard chess={chess} newGame={newGame}></ChessBoard> 
            <File></File>
        </section>
    );
};

export default Game;
