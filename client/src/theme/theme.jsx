import { createTheme } from '@mui/material/styles';

const Theme = ({ mode = 'light', setMode = () => { } }) => {
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const primaryColor = mode === 'light' ? "#a31545" : "#000";
  const secondaryColor = mode === 'light' ? '#fff' : '#000'


  const theme = createTheme({
    palette: {
      mode,
      primary: { main: primaryColor },
      secondary: { main: secondaryColor },
    },
  });

  return { toggleColorMode, theme };
}
export default Theme;
