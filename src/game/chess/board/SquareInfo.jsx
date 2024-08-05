/* eslint-disable react/prop-types */
import './SquareInfo.css';
// eslint-disable-next-line react/prop-types
const SquareInfo = ({ chess, square, piece }) => {
    const names = {
        p: 'Pawn',
        r: 'Rook',
        n: 'Knight',
        b: 'Bishop',
        q: 'Queen',
        k: 'King',
    };
    if (chess) {
        return (
            <span className='selected-piece'>
                {square ? square.toUpperCase() + ', ' : ''}
                {piece ? piece.color === 'w' ? 'White' : (piece) ? 'Black' : '' : ''} {piece ? names[piece.type] : '' }
            </span>
        );
    }

};

export default SquareInfo;

/* 
    if (!square) {
        return <div>No square selected</div>;
    }

    // eslint-disable-next-line react/prop-types
    const { row, col } = square;

    // Convert row and column to chess notation
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const file = files[col];
    const rank = 8 - row; // Ranks are 1-8 from bottom to top
    //const piece = chess.get(square);

    return (
        <div className="square-info">
            <p>Hovered Square: {file}{rank}</p>
            <p>Row: {row}</p>
            <p>Column: {col}</p>
        </div>
    );

*/
