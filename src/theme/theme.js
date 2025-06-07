import { createTheme } from '@mui/material/styles'

// Modern color palette
const colors = {
  primary: {
    main: '#2667FF',
    light: '#5B85FF',
    dark: '#1347CC',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#FF6B35',
    light: '#FF8A61',
    dark: '#CC5429',
    contrastText: '#FFFFFF'
  },
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C'
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00'
  },
  error: {
    main: '#F44336',
    light: '#EF5350',
    dark: '#D32F2F'
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2'
  },
  background: {
    default: '#F8FAFC',
    paper: '#FFFFFF',
    dark: '#1E293B'
  },
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    disabled: '#CBD5E1'
  },
  divider: '#E2E8F0',
  action: {
    hover: 'rgba(38, 103, 255, 0.04)',
    selected: 'rgba(38, 103, 255, 0.08)',
    disabled: 'rgba(30, 41, 59, 0.26)',
    disabledBackground: 'rgba(30, 41, 59, 0.12)'
  }
}

// Create theme
export const customTheme = createTheme({
  palette: {
    ...colors,
    mode: 'light'
  },
  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.text.primary
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: colors.text.secondary
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em'
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      color: colors.text.secondary
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      lineHeight: 1.4
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ...Array(18).fill('0px 25px 50px -12px rgba(0, 0, 0, 0.25)')
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 8px 25px rgba(38, 103, 255, 0.3)'
          }
        },
        contained: {
          boxShadow: '0px 4px 12px rgba(38, 103, 255, 0.3)',
          '&:hover': {
            boxShadow: '0px 8px 25px rgba(38, 103, 255, 0.4)'
          }
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.15)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          height: 32,
          '&.MuiChip-filled': {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
            '&:hover': {
              backgroundColor: colors.primary.dark
            }
          },
          '&.MuiChip-outlined': {
            borderColor: colors.primary.main,
            color: colors.primary.main,
            '&:hover': {
              backgroundColor: colors.action.hover
            }
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            '& fieldset': {
              borderColor: colors.divider
            },
            '&:hover fieldset': {
              borderColor: colors.primary.light
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
              borderWidth: '2px'
            }
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          marginTop: 4
        },
        option: {
          borderRadius: 8,
          margin: '4px 8px',
          '&[aria-selected="true"]': {
            backgroundColor: colors.action.selected
          },
          '&:hover': {
            backgroundColor: colors.action.hover
          }
        }
      }
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            borderRadius: 12,
            boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.15)'
          }
        }
      }
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderRadius: '20px 20px 0 0',
          boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          borderBottom: 'none',
          backgroundColor: colors.background.paper
        }
      }
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: colors.primary.main
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.MuiPaper-elevation0': {
            boxShadow: 'none !important',
            backgroundColor: 'transparent !important'
          },
          '&.MuiPaper-root': {
            backgroundColor: 'transparent !important'
          }
        }
      }
    }
  }
})

export default customTheme 