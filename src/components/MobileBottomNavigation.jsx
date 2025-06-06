import React, { useState } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Fab,
  Box,
  useMediaQuery,
  useTheme,
  Badge
} from '@mui/material'
import {
  Map as MapIcon,
  Event as EventIcon,
  FilterList as FilterIcon,
  Add as AddIcon
} from '@mui/icons-material'

export const MobileBottomNavigation = ({
  onMapView,
  onEventsList,
  onFilters,
  onAddEvent,
  currentView = 0,
  eventsCount = 0,
  activeFiltersCount = 0
}) => {
  const [value, setValue] = useState(currentView)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleChange = (event, newValue) => {
    setValue(newValue)

    switch (newValue) {
      case 0:
        onMapView?.()
        break
      case 1:
        onEventsList?.()
        break
      case 2:
        onFilters?.()
        break
      default:
        break
    }
  }

  if (!isMobile) return null

  return (
    <>
      {/* FAB for adding events - Redesigned */}
      <Fab
        color='primary'
        aria-label='add event'
        onClick={onAddEvent}
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 20,
          width: 56,
          height: 56,
          backgroundColor: '#2667FF',
          background: 'linear-gradient(135deg, #2667FF 0%, #1e4fd9 100%)',
          '&:hover': {
            backgroundColor: '#1e4fd9',
            background: 'linear-gradient(135deg, #1e4fd9 0%, #1847c7 100%)',
            transform: 'scale(1.1)',
            boxShadow: '0 12px 24px rgba(38, 103, 255, 0.4)'
          },
          '&:active': {
            transform: 'scale(0.95)'
          },
          boxShadow: '0 8px 20px rgba(38, 103, 255, 0.3)',
          zIndex: 1200,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <AddIcon sx={{ fontSize: '1.8rem', color: 'white' }} />
      </Fab>

      {/* Bottom Navigation - Redesigned */}
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.15)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 2
          }
        }}
        elevation={0}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          sx={{
            height: 80,
            paddingTop: 1,
            paddingBottom: 1,
            borderRadius: '24px 24px 0 0',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& .MuiBottomNavigationAction-root': {
              minWidth: 80,
              maxWidth: 120,
              padding: '8px 12px 12px',
              borderRadius: '16px',
              margin: '0 4px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex !important',
              flexDirection: 'column !important',
              alignItems: 'center !important',
              justifyContent: 'center !important',
              gap: '2px',
              '&:hover': {
                backgroundColor: 'rgba(38, 103, 255, 0.08)',
                transform: 'translateY(-2px)'
              },
              '&.Mui-selected': {
                color: '#2667FF',
                backgroundColor: 'rgba(38, 103, 255, 0.12)',
                transform: 'translateY(-3px)',
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                  filter: 'drop-shadow(0 2px 4px rgba(38, 103, 255, 0.3))'
                },
                '& .MuiBottomNavigationAction-label': {
                  fontWeight: 600,
                  transform: 'scale(1.05)'
                }
              }
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem !important',
              marginTop: '0px !important',
              fontWeight: 500,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: 'center',
              lineHeight: '1.2',
              '&.Mui-selected': {
                fontSize: '0.75rem !important'
              }
            }
          }}
        >
          <BottomNavigationAction
            label='Mapa'
            icon={<MapIcon />}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: '1.5rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }
            }}
          />
          <BottomNavigationAction
            label='Eventos'
            icon={
              <Badge
                badgeContent={eventsCount > 0 ? eventsCount : null}
                color='error'
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.6rem',
                    minWidth: 18,
                    height: 18,
                    borderRadius: '9px',
                    backgroundColor: '#FF4444',
                    color: 'white',
                    fontWeight: 600
                  }
                }}
              >
                <EventIcon />
              </Badge>
            }
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: '1.5rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }
            }}
          />
          <BottomNavigationAction
            label='Filtros'
            icon={
              <Badge
                badgeContent={activeFiltersCount > 0 ? activeFiltersCount : null}
                color='primary'
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.6rem',
                    minWidth: 18,
                    height: 18,
                    borderRadius: '9px',
                    backgroundColor: '#2667FF',
                    color: 'white',
                    fontWeight: 600
                  }
                }}
              >
                <FilterIcon />
              </Badge>
            }
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: '1.5rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }
            }}
          />
        </BottomNavigation>
      </Paper>

      {/* Safe area for content */}
      <Box sx={{ height: 80 }} />
    </>
  )
}
