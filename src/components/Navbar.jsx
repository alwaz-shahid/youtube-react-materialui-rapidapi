import React from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { logo } from '../utils/constants';

import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import SearchBar from './SearchBar';
import Appmenu from './Appmenu';

const Navbar = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const navigate = useNavigate();

  // const onhandleSubmit = (e) => {
  //   e.preventDefault();

  //   if (searchTerm) {
  //     navigate(`/search/${searchTerm}`);

  //     // setSearchTerm('');
  //   }
  // };

  return (
    <Stack
      direction='row'
      alignItems='center'
      p={2}
      sx={{
        position: 'sticky',
        background: '#212529',
        top: 0,
        justifyContent: 'space-between',
        zIndex: 3,
      }}
      boxShadow={2}>
      <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt='logo' height={35} />{' '}
      </Link>

      <SearchBar />
      <Stack direction='row' alignItems='center'>
        <Appmenu />
        <AvatarIcon />
        {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar> */}
      </Stack>
    </Stack>
  );
};

export default Navbar;

const AvatarIcon = () => (
  <Avatar
    sx={{
      bgcolor: '#FF5722',
      width: 24,
      height: 24,
      padding: 0.2,
      marginLeft: 0.5,
    }}>
    N
  </Avatar>
);
