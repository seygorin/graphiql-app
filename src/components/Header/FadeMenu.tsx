import * as React from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Buttons from './Buttons';
import SelectLanguage from './SelectLanguage';

const STYLES = {
  buttonMenu: {
    margin: 0,
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
  },
};

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        sx={STYLES.buttonMenu}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuRoundedIcon fontSize='large' />
      </Button>
      <Menu
        sx={STYLES.menu}
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <SelectLanguage />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Buttons />
        </MenuItem>
      </Menu>
    </>
  );
}
