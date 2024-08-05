import './File.css';
const File = () => {
    const files = ['A','B','C','D','E','F','G','H'];
  
    return (
      <aside className='file-labels'>
        {files.map((file) => (
          <div key={file} className='file-label'>
            {file}
          </div>
        ))}
      </aside>
    );
  };
  
  export default File;