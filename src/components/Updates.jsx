export default function Updates() {
  const updateStyles = {
    backgroundColor: '#0092FF',
    borderRadius: '8px',
    margin: '20px',
    padding: '20px',
    color: '#f2f2f2',
  };

  const listItemStyles = {
    fontSize: '18px',
    marginBottom: '10px',
    listStyleType: 'square',
    color: '#212529',
  };

  const updates = [
    'Focus Player mode, watch videos without changing screens and losing focus 😀',
    'Loop Button added 😀',
    'Like Button added 😀',
    'Popover removed 😔',
  ];

  return (
    <div style={updateStyles}>
      <h1 color={'white'}>Updates:</h1>
      <ul>
        {updates.map((update, index) => (
          <li key={index} style={listItemStyles}>
            {update}
          </li>
        ))}
      </ul>
    </div>
  );
}
