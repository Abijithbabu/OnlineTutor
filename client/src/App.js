// App.js
import React, { useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Theme from './theme/theme';
import { motion } from 'framer-motion';
import { HashRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Routes from './routes/Routes';

export const ColorModeContext = React.createContext();

const App = () => {
  const [mode, setMode] = useState(useSelector(store => store?.mode?.theme?.palette?.mode) ?? 'dark');
  const colorMode = useMemo(() => Theme({ mode, setMode }), [mode]);
  const dispatch = useDispatch({ type: 'mode', payload: colorMode })
  useEffect(() => {
    dispatch({ type: 'mode', payload: colorMode })
  }, [colorMode])
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={colorMode.theme}>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <HashRouter>
            <Routes />
          </HashRouter>
        </motion.div>
        <CssBaseline />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
