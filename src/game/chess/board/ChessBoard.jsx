/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState, useRef } from 'react';
import './ChessBoard.css';
import SquareInfo from './SquareInfo';
import MoveList from './MoveList';

const ChessBoard = ({ chess, newGame }) => {
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [hoveredPiece, setHoveredPiece] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('w');
  const [gameStatus, setGameStatus] = useState('');

  const moveListRef = useRef();
  const host = {
    isGhPages: window.location.href.toLowerCase().includes('.github.io') && true
  };
  const pieceIcons = {
    p: 'fa-chess-pawn',
    r: 'fa-chess-rook',
    n: 'fa-chess-knight',
    b: 'fa-chess-bishop',
    q: 'fa-chess-queen',
    k: 'fa-chess-king',
  };

  const getIcon = (piece) => {
    if (!piece) return null;
    return pieceIcons[piece];
  };

  const handleMouseEnter = (rowIndex, colIndex) => {
    const square = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
    const piece = chess.get(square);

    setHoveredSquare(square);
    setHoveredPiece(piece);
  };

  const handleSquareClick = (rowIndex, colIndex) => {
    const square = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
    const piece = chess.get(square);

    // Select piece if it belongs to the current player
    if (piece && piece.color === currentTurn) {
      setSelectedSquare(square);
      setSelectedPiece(piece);
      const moves = chess.moves({ square, verbose: true });
      setValidMoves(moves.map((move) => move.to));
    } else if (validMoves.includes(square)) {
      // Make the move
      chess.move({ from: selectedSquare, to: square });
      moveListRef.current.addMove(chess.history({ verbose: true }).pop().san);

      // Switch turn
      const nextTurn = currentTurn === 'w' ? 'b' : 'w';
      setCurrentTurn(nextTurn);
      setSelectedSquare(null);
      setSelectedPiece(null);
      setValidMoves([]);

      // Update game status
      if (chess.isCheckmate()) {
        setGameStatus(`${nextTurn === 'w' ? 'Black' : 'White'} wins by checkmate!`);
      } else if (chess.inCheck()) {
        setGameStatus(`${nextTurn === 'w' ? 'White' : 'Black'} is in check!`);
      } else {
        setGameStatus('');
      }
    } else {
      // Deselect if clicking an invalid square
      setSelectedSquare(null);
      setSelectedPiece(null);
      setValidMoves([]);
    }
  };

  const renderBoard = () => {
    // eslint-disable-next-line react/prop-types
    const board = chess ? chess.board() : [];

    return board.map((row, rowIndex) => (
      <section key={rowIndex} className='chess-board-row'>
        {row.map((square, colIndex) => {
          const isAltSquare = (rowIndex + colIndex) % 2 === 1;
          const piece = square ? square.type : null;

          const isSelected = selectedSquare === String.fromCharCode(97 + colIndex) + (8 - rowIndex);
          const isValidMove = validMoves.includes(String.fromCharCode(97 + colIndex) + (8 - rowIndex));

          return (
            <div
              key={colIndex}
              className={`chess-board-square ${isAltSquare ? 'chess-board-square-alt' : ''} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}`}
              style={{
                backgroundImage: `url(${host.isGhPages ? '/replika-chess/' : '/'}assets/${isAltSquare ? 'blackTile' : 'whiteTile'}.png) !important`
              }}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              {piece && (
                <span className='chess-piece-container'>
                  <i
                    className={`fa fa-solid ${getIcon(piece)} chess-piece-border ${square.color === 'w' ? 'black-border' : 'white-border'
                      }`}
                  ></i>
                  <i
                    className={`fa fa-solid ${getIcon(piece)} chess-piece ${square.color === 'w' ? 'white-piece' : 'black-piece'
                      }`}
                  ></i>
                </span>
              )}
            </div>
          );
        })}
      </section>
    ));
  };

  return (
    <>
      <section className='chess-board-container'>{renderBoard()}</section>
      <section className='game-turn'>
        <span className='dot-container'>
          <i className={`fa fa-solid fa-circle dot-border ${currentTurn === 'w' ? 'b' : 'w'}`}></i>
          <i className={`fa fa-solid fa-circle dot ${currentTurn === 'w' ? 'w' : 'b'}`}></i>
        </span>
      </section>
      <section className='game-status'>
        <p>{gameStatus}</p>
      </section>
      <SquareInfo chess={chess} square={selectedSquare} piece={selectedPiece}></SquareInfo>
      <MoveList ref={moveListRef} chess={chess} validMoves={validMoves} />
      <input className='new-game' type='button' value='New Game' onClick={() => {
        newGame();
        moveListRef.current.clearMoves();
      }} />
    </>
  );
};

export default ChessBoard;
