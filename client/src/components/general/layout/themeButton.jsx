import React from 'react';
import { Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeButton = ({ toggleColorMode, theme }) => {
  const dark = theme?.palette.mode === 'dark' ? true :false
  return (
    <div>
      <Button onClick={toggleColorMode} style={{color:dark?'white':'#a31545'}}>
        {dark ? <Brightness4Icon /> : <Brightness7Icon />}&nbsp;&nbsp;Theme
      </Button>
    </div>
  );
}

export default ThemeButton;
