import { useEffect, useState, useCallback } from 'react';
import { getAllDataFromSearchBar } from '../utils/db/localDb';
import { useNavigate } from 'react-router-dom';

const SearchTermView = () => {
  const [searchTerms, setSearchTerms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch search term data from the offline database and update the state
    const fetchSearchTerms = async () => {
      const allSearchTerms = await getAllDataFromSearchBar();
      setSearchTerms(allSearchTerms);
    };
    fetchSearchTerms();
  }, []);

  // Memoized version of the handleTermClick function using useCallback
  const handleTermClick = useCallback(
    (term) => {
      navigate(`/search/${term}`);
    },
    [navigate] // Dependency array includes only navigate function
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: '30px',
        left: '-0.1px',
        background: 'rgba(255, 255, 255, 0.9)',
        minWidth: '100%',
        borderRadius: '8px',
        zIndex: 2,
      }}>
      <div style={{ paddingLeft: '2px', fontSize: '20px', fontWeight: 'bold' }}>
        <p>Search Terms</p>
        <ul>
          {searchTerms.map((term) => (
            <li
              key={term.id}
              onClick={() => handleTermClick(term.term)}
              style={{
                cursor: 'pointer',
                borderColor: 'black',
                borderBottom: '2px',
                padding: '3px',
                fontSize: '20px',
                display: 'block',
              }}>
              {term.term}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchTermView;
