import React, { useMemo, useState } from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import ThemeButton from './components/themeButton';
import Theme from './theme/theme';
import Navbar from './components/navBar';
import Home from './pages/home.jsx';
import { motion } from 'framer-motion';
import Auth from './components/login';
import Cards from './components/card';

const ColorModeContext = React.createContext();

const App = () => {
  const [mode, setMode] = useState('dark');
  const colorMode = useMemo(() => Theme({ mode, setMode }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={colorMode.theme}>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Container>
          <Navbar onToggleColorMode={colorMode.toggleColorMode} onTheme={colorMode.theme} />
          <Home/>
          <Auth />
          <Cards/>
          </Container>
        </motion.div>
        <CssBaseline />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
