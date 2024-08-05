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

    const newGame = () => {
        setChess(new Chess());
    }

    const host = {
        isGhPages: window.location.href.toLowerCase().includes('.github.io') && true
    };

    const instructions = `
[
Let's play chess. Here is the board:
   +------------------------+
 8 | r  n  b  q  k  b  n  r |
 7 | p  p  p  p  p  p  p  p |
 6 | .  .  .  .  .  .  .  . |
 5 | .  .  .  .  .  .  .  . |
 4 | .  .  .  .  .  .  .  . |
 3 | .  .  .  .  .  .  .  . |
 2 | P  P  P  P  P  P  P  P |
 1 | R  N  B  Q  K  B  N  R |
   +------------------------+
     a  b  c  d  e  f  g  h
]
{
Upper case letter are White and lower case letters are Black.
Therefore the letters on the board mean the following:
    p: black pawn
    r: black rook
    n: black knight
    b: black bishop
    q: black queen
    k: black king
    P: white pawn
    R: white rook
    N: white knight
    B: white bishop
    Q: white queen
    K: white king
    .: empty square
}
I will also, keep up with our move history using PGN, and share it with you, when I make my move. 
You'll just need to tell me your moves when it is your turn. 
Do you want to be white or black?`;

    return (
        <>
            <i className="fa fas fa-question-circle instructions" title={`click to copy: ${instructions}`}
            onClick={() => {
                navigator.clipboard.writeText(instructions).then(() => {
                    alert('Instructions copied to clipboard!');
                  }).catch((err) => {
                    console.error('Failed to copy text: ', err);
                  });
            }}></i>
            <section className='game-board' style={{
                backgroundImage: `url(${host.isGhPages ? '/replika-chess/' : '/'}assets/boardBorder.png) !important`
            }}>
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
        </>
    );
};

export default Game;
