/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Chess } from 'chess.js'; // Make sure to import Chess from chess.js
import Rank from './board/Rank';
import File from './board/File';
import ChessBoard from './board/ChessBoard';
import './Game.css';

const Game = () => {
    const [chess, setChess] = useState(null);
    const [userName, setUserName] = useState('White');
    const [replikaName, setReplikaName] = useState('Black');

    useEffect(() => {
        const game = new Chess();
        setChess(game);
    }, []);

    const newGame= () => {
        setChess(new Chess());
    };

    return (
        <section className='game-board'>
            {/*
            <section className='users'>
                <span>User: </span><input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
                <span>Replika: </span><input type='text' value={replikaName} onChange={(e) => setReplikaName(e.target.value)} />
            </section>
            */}
            <Rank></Rank>
            <ChessBoard chess={chess} newGame={newGame}></ChessBoard> 
            <File></File>
        </section>
    );
};

export default Game;
