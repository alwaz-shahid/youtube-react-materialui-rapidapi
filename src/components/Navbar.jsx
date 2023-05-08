import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { logo } from '../utils/constants';
import SearchBar from './SearchBar';
// import SearchBar from './SearchBar';
// import { SearchBar } from "./";

const Navbar = () => (
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
    <SearchBar />
  </Stack>
);

export default Navbar;
