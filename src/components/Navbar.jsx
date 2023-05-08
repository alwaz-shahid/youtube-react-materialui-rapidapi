import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { logo } from '../utils/constants';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      history.push(`/search/${searchTerm}`);
    }
  };
  return (
    <Stack
      direction='row'
      alignItems='center'
      p={2}
      sx={{
        position: 'sticky',
        background: '#00272B',
        top: 0,
        justifyContent: 'space-between',
      }}>
      <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt='logo' height={35} />{' '}
      </Link>
      <Paper
        component='form'
        onSubmit={handleSubmit}
        sx={{
          borderRadius: 20,
          border: '1px solid #e3e3e3',
          pl: 2,
          boxShadow: 'none',
          mr: { sm: 5 },
        }}>
        <input
          className='search-bar'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton
          type='submit'
          sx={{ p: '5px', color: '#00272B' }}
          aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Navbar;
