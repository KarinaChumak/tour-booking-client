import { createTheme } from '@mui/material/styles';

export const colors = {
  blue: {
    100: '#ccf4f4',
    200: '#99e9e9',
    300: '#66dfde',
    400: '#33d4d3',
    500: '#00c9c8',
    600: '#00a1a0',
    700: '#007978',
    800: '#005050',
    900: '#002828',
  },
  green: {
    100: '#cdeae1',
    200: '#9bd5c3',
    300: '#69c0a5',
    400: '#37ab87',
    500: '#059669',
    600: '#047854',
    700: '#035a3f',
    800: '#023c2a',
    900: '#011e15',
  },
  red: {
    100: '#f8d4d4',
    200: '#f1a8a8',
    300: '#ea7d7d',
    400: '#e35151',
    500: '#dc2626',
    600: '#b01e1e',
    700: '#841717',
    800: '#580f0f',
    900: '#2c0808',
  },
  grey: {
    100: '#fafafa',
    200: '#efefef',
    300: '#a9a9aa',
    400: '#7d7d7f',
    500: '#525255',
    600: '#27272a',
    700: '#171719',
    800: '#101011',
    900: '#080808',
  },
  lightGreen: {
    100: '#f4fde5',
    200: '#e8fbcc',
    300: '#ddf8b2',
    400: '#d1f699',
    500: '#c6f47f',
    600: '#97CD46',
    700: '#77924c',
    800: '#4f6233',
    900: '#283119',
  },
  white: {
    100: '#fff',
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      light: colors.blue[200],
      main: colors.blue[800],
      dark: colors.blue[900],
    },
    secondary: {
      light: colors.lightGreen[200],
      main: colors.lightGreen[500],
      dark: colors.lightGreen[600],
    },

    background: {
      light: colors.grey[200],
      main: colors.grey[300],
      dark: colors.grey[500],
    },
    white: { main: colors.white[100] },
    text: {
      light: colors.grey[500],
      main: colors.grey[600],
      dark: colors.grey[900],
    },
  },
  typography: {
    fontFamily: ['Source Code Pro', 'sans serif'].join(','),
    fontSize: 12,
    h1: {
      fontFamily: ['Source Code Pro', 'sans serif'].join(','),
      fontSize: 40,
    },
    h2: {
      fontFamily: ['Source Code Pro', 'sans serif'].join(','),
      fontSize: 32,
    },
    h3: {
      fontFamily: ['Source Code Pro', 'sans serif'].join(','),
      fontSize: 24,
    },
    h4: {
      fontFamily: ['Source Code Pro', 'sans serif'].join(','),
      fontSize: 20,
    },
    h5: {
      fontFamily: ['Source Code Pro', 'sans serif'].join(','),
      fontSize: 16,
    },
    h6: {
      fontFamily: ['Source Code Pro', 'sans serif'].join(','),
      fontSize: 14,
    },
  },
  shape: {
    borderRadius: 28,
  },
});

// export const tokens = (mode) => ({
//   ...(mode === 'dark'
//     ? {
//         primary: {
//           100: '#002828',
//           200: '#005050',
//           300: '#007978',
//           400: '#00a1a0',
//           500: '#00c9c8',
//           600: '#33d4d3',
//           700: '#66dfde',
//           800: '#99e9e9',
//           900: '#ccf4f4',
//         },
//         green: {
//           100: '#011e15',
//           200: '#023c2a',
//           300: '#035a3f',
//           400: '#047854',
//           500: '#059669',
//           600: '#37ab87',
//           700: '#69c0a5',
//           800: '#9bd5c3',
//           900: '#cdeae1',
//         },
//         red: {
//           100: '#2c0808',
//           200: '#580f0f',
//           300: '#841717',
//           400: '#b01e1e',
//           500: '#dc2626',
//           600: '#e35151',
//           700: '#ea7d7d',
//           800: '#f1a8a8',
//           900: '#f8d4d4',
//         },
//         grey: {
//           100: '#080808',
//           200: '#101011',
//           300: '#171719',
//           400: '#27272a',
//           500: '#525255',
//           600: '#7d7d7f',
//           700: '#a9a9aa',
//           800: '#d4d4d4',
//           900: '#fafafa',
//         },
//         lightGreen: {
//           100: '#283119',
//           200: '#4f6233',
//           300: '#77924c',
//           400: '#9ec366',
//           500: '#c6f47f',
//           600: '#d1f699',
//           700: '#ddf8b2',
//           800: '#e8fbcc',
//           900: '#f4fde5',
//         },
//         yellow: {
//           100: '#323217',
//           200: '#64632d',
//           300: '#959544',
//           400: '#c7c65a',
//           500: '#f9f871',
//           600: '#faf98d',
//           700: '#fbfbaa',
//           800: '#fdfcc6',
//           900: '#fefee3',
//         },
//       }
//     : {
//         primary: {
//           100: '#ccf4f4',
//           200: '#99e9e9',
//           300: '#66dfde',
//           400: '#33d4d3',
//           500: '#00c9c8',
//           600: '#00a1a0',
//           700: '#007978',
//           800: '#005050',
//           900: '#002828',
//         },
//         green: {
//           100: '#cdeae1',
//           200: '#9bd5c3',
//           300: '#69c0a5',
//           400: '#37ab87',
//           500: '#059669',
//           600: '#047854',
//           700: '#035a3f',
//           800: '#023c2a',
//           900: '#011e15',
//         },
//         red: {
//           100: '#f8d4d4',
//           200: '#f1a8a8',
//           300: '#ea7d7d',
//           400: '#e35151',
//           500: '#dc2626',
//           600: '#b01e1e',
//           700: '#841717',
//           800: '#580f0f',
//           900: '#2c0808',
//         },
//         grey: {
//           100: '#fafafa',
//           200: '#d4d4d4',
//           300: '#a9a9aa',
//           400: '#7d7d7f',
//           500: '#525255',
//           600: '#27272a',
//           700: '#171719',
//           800: '#101011',
//           900: '#080808',
//         },
//         lightGreen: {
//           100: '#f4fde5',
//           200: '#e8fbcc',
//           300: '#ddf8b2',
//           400: '#d1f699',
//           500: '#c6f47f',
//           600: '#9ec366',
//           700: '#77924c',
//           800: '#4f6233',
//           900: '#283119',
//         },
//         yellow: {
//           100: '#fefee3',
//           200: '#fdfcc6',
//           300: '#fbfbaa',
//           400: '#faf98d',
//           500: '#f9f871',
//           600: '#c7c65a',
//           700: '#959544',
//           800: '#64632d',
//           900: '#323217',
//         },
//       }),
// });
// export const themeSettings = (mode) => {
//   const colors = tokens(mode);

//   return {
//     palette: { mode },
//     ...(mode === 'dark'
//       ? {
//           primary: {
//             main: colors.primary[500],
//           },
//           secondary: {
//             main: colors.lightGreen[500],
//           },
//           neutral: {
//             dark: colors.grey[200],
//             main: colors.grey[500],
//             light: colors.grey[800],
//           },
//           background: {
//             default: colors.grey[100],
//           },
//         }
//       : {
//           primary: {
//             main: colors.primary[500],
//           },
//           secondary: {
//             main: colors.lightGreen[500],
//           },
//           neutral: {
//             dark: colors.grey[200],
//             main: colors.grey[500],
//             light: colors.grey[800],
//           },
//           background: {
//             default: colors.grey[600],
//           },
//         }),

//     typography: {
//       fontFamily: ['Source Sans Pro', 'sans serif'].join(','),
//       fontSize: 12,
//       h1: {
//         fontFamily: ['Source Sans Pro', 'sans serif'].join(','),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ['Source Sans Pro', 'sans serif'].join(','),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ['Source Sans Pro', 'sans serif'].join(','),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ['Source Sans Pro', 'sans serif'].join(','),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ['Source Sans Pro', 'sans serif'].join(','),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ['Source Sans Pro', 'sans serif'].join(','),
//         fontSize: 14,
//       },
//     },
//   };
// };

// export const ColorModeContext = createContext({
//   toggleColorMode: () => {},
// });

// export function useMode() {
//   const [mode, setMode] = useState('light');

//   const colorMode = useMemo(() => {
//     toggleColorMode: () =>
//       setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
//   }, []);

//   const theme = useMemo(
//     () => createTheme(themeSettings(mode)),
//     [mode]
//   );

//   return [theme, colorMode];
// }
