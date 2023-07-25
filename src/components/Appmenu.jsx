import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
function Appmenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (param) => {
    setAnchorEl(null);
    navigate(param);
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
        <MenuItem>
          <a href='https://www.linkedin.com/in/alwaz-shahid'>
            Contact Developer
          </a>
        </MenuItem>
        <MenuItem>
          <a href='https://github.com/alwaz-shahid'>Developer's Work</a>
        </MenuItem>

        <MenuItem disabled onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem disabled onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem onClick={() => handleClose('/about')}>About</MenuItem>
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
