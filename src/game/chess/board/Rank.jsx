import './Rank.css';
const Rank = () => {
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  
    return (
      <aside className='rank-labels'>
        {ranks.map((rank) => (
          <div key={rank} className='rank-label'>
            {rank}
          </div>
        ))}
      </aside>
    );
  };
  
  export default Rank;