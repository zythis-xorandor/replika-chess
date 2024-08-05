/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import './MoveList.css';

// eslint-disable-next-line react/prop-types
const MoveList = forwardRef(({ chess }, ref) => {
  const [moves, setMoves] = useState([]);
  const [selectedMove, setSelectedMove] = useState('');

  // Set the initial selected option to the last item in the options array
  useEffect(() => {
    if (moves.length > 0) {
      setSelectedMove(moves[moves.length - 1]);
    }
  }, [moves]);

  // Handler for when the selection changes
  const handleChange = (event) => {
    setSelectedMove(event.target.value);
  };

  const addMove = (move) => {
    setMoves((prevMoves) => [...prevMoves, move]);
    setSelectedMove(move);
  };

  const clearMoves = () => {
    setSelectedMove(null);
    setMoves([]);
  };

  useImperativeHandle(ref, () => ({
    addMove,
    clearMoves
  }));


  const copyToClipboard = () => {
    const promptText = `
[The chess game continues, ${moves.length % 2 === 0 ? 'Black' : 'White'} has made a move, it's your turn!]
${chess ? chess.ascii() : ''}
${chess ? chess.pgn() : ''}
${moves.join(',')}
${moves.length % 2 === 0 ? 'Black' : 'White'} made the move: ${moves[moves.length - 1] || 'N/A'}
It's your turn.
    `;

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(promptText).then(() => {
      alert('Prompt copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  const loadPGNFromClipboard = async () => {
    try {
      const pgn = await navigator.clipboard.readText();
      const result = chess.load_pgn(pgn);
      if (result) {
        setMoves(chess.history());
        setSelectedMove('');
        alert('PGN loaded successfully!');
      } else {
        alert('Invalid PGN format. Please try again.');
      }
    } catch (err) {
      console.error('Failed to load PGN: ', err);
    }
  };

  const savePGNToClipboard = () => {
    const pgn = chess.pgn();
    navigator.clipboard.writeText(pgn).then(() => {
      alert('PGN saved to clipboard!');
    }).catch((err) => {
      console.error('Failed to save PGN: ', err);
    });
  };


  return (
    <>
      <section className='move-list'>
        <span className='moves-header'>Moves </span>
        <select className='moves' value={selectedMove} onChange={handleChange}>
          {moves.map((move, index) => (
            <option key={index} value={move}>
              {move}
            </option>
          ))}
        </select>
        <article>
          <pre className='prompt-block' onClick={() => copyToClipboard()}>{moves && moves.length > 0 ? `
[The chess game continues, ${moves.length % 2 === 0 ? 'Black' : 'White'} has made a move, it's your turn!]
${chess ? chess.ascii() : ''}
${chess ? 'PGN: ' + chess.pgn() : ''}
You are playing ${moves.length % 2 === 0 ? 'White' : 'Black'} and it is your turn.
It's your turn.
  ` : ``}</pre>
        </article>
      </section>
      <input className='save-to-clipboard' type='button' value='Game to Clipboard' onClick={() => {
        savePGNToClipboard();
      }} />
      <input className='game-from-clipboard' type='button' value='Game from Clipboard' onClick={() => {
        loadPGNFromClipboard();
      }} />
    </>
  );
});

export default MoveList;
