import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
function Appmenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    Navigate;
  };

  return (
    <div>
      {/* <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        Dashboard
      </Button> */}
      <RotatingIconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          onClick={() => {
            navigate('FocusPlayer');
            handleClose;
          }}>
          FocusPlayer
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('update-news');
            handleClose;
          }}>
          {`    What's New`}
        </MenuItem>
        <MenuItem disabled onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem disabled onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem disabled onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

const RotatingIconButton = ({ ...rest }) => {
  return (
    <IconButton
      {...rest}
      type='submit'
      sx={{
        p: '5px',
        color: '#fff',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'rotate(360deg)',
        },
      }}
      aria-label='search'>
      <SettingsIcon />
    </IconButton>
  );
};

export default Appmenu;
