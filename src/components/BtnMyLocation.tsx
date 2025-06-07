/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useReducer, useState } from 'react'
import { PlacesContext } from '../context'
import { placesReducer } from '../context/places/placesReducer'
import { PlacesState } from '../context/places/PlacesProvider'
import { 
  Fab, 
  Tooltip, 
  SpeedDial, 
  SpeedDialAction, 
  SpeedDialIcon,
  Box,
  useTheme,
  alpha,
  useMediaQuery
} from '@mui/material'
import { 
  MyLocation as MyLocationIcon,
  Museum as MuseumIcon,
  Restaurant as RestaurantIcon,
  Store as StoreIcon,
  Hotel as HotelIcon,
  LocalActivity as ActivityIcon,
  Close as CloseIcon
} from '@mui/icons-material'

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
  placesFiltered: [],
  eventos: []
}

const filterActions = [
  {
    icon: <MuseumIcon />,
    name: 'Museos',
    filter: 'Interes Cultural',
    color: '#E91E63'
  },
  {
    icon: <RestaurantIcon />,
    name: 'Restaurantes',
    filter: 'Gastronomía',
    color: '#FF9800'
  },
  {
    icon: <StoreIcon />,
    name: 'Tiendas',
    filter: 'Comercio',
    color: '#4CAF50'
  },
  {
    icon: <HotelIcon />,
    name: 'Hospedaje',
    filter: 'Hospedaje',
    color: '#2196F3'
  },
  {
    icon: <ActivityIcon />,
    name: 'Actividades',
    filter: 'Recreación',
    color: '#9C27B0'
  }
]

export const BtnMyLocation = () => {
  const { places, placesFiltered, isLoadingPlaces, SetPlaces } = useContext(PlacesContext)
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)
  const [open, setOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const onClick = (filter: string, filterName: string) => {
    if (selectedFilter === filter) {
      // Si ya está seleccionado el mismo filtro, mostrar todos
      SetPlaces(places)
      setSelectedFilter('')
    } else {
      // Aplicar nuevo filtro
      const placesFilter = places.filter(place => 
        filter === '' || place.properties?.categoria === filter
      )
      SetPlaces(placesFilter)
      setSelectedFilter(filter)
    }
    setOpen(false)
  }

  const clearFilters = () => {
    SetPlaces(places)
    setSelectedFilter('')
    setOpen(false)
  }

  const getCurrentLocationIcon = () => {
    if (isLoadingPlaces) {
      return <MyLocationIcon className="rotating" />
    }
    
    const activeAction = filterActions.find(action => action.filter === selectedFilter)
    return activeAction ? activeAction.icon : <MyLocationIcon />
  }

  const getCurrentColor = () => {
    const activeAction = filterActions.find(action => action.filter === selectedFilter)
    return activeAction ? activeAction.color : theme.palette.primary.main
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        // Posición diferente para móvil y escritorio
        top: isMobile ? 200 : 30,
        left: isMobile ? 20 : 'auto',
        right: isMobile ? 'auto' : 30,
        zIndex: 1150, // Mayor que el FAB móvil (1140) pero menor que la navegación (1100)
        '& .rotating': {
          animation: 'spin 1s linear infinite',
        },
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }}
    >
      <SpeedDial
        ariaLabel="Filtros de lugares"
        sx={{
          '& .MuiFab-primary': {
            bgcolor: getCurrentColor(),
            width: isMobile ? 48 : 56,
            height: isMobile ? 48 : 56,
            '&:hover': {
              bgcolor: alpha(getCurrentColor(), 0.8),
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease-in-out',
            boxShadow: `0 8px 20px ${alpha(getCurrentColor(), 0.4)}`,
          }
        }}
        icon={
          <SpeedDialIcon 
            icon={getCurrentLocationIcon()} 
            openIcon={<CloseIcon />}
            sx={{
              '& .MuiSpeedDialIcon-icon': {
                fontSize: isMobile ? '1.25rem' : '1.5rem'
              },
              '& .MuiSpeedDialIcon-openIcon': {
                fontSize: isMobile ? '1.25rem' : '1.5rem'
              }
            }}
          />
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction={isMobile ? "up" : "down"}
      >
        {filterActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => onClick(action.filter, action.name)}
            sx={{
              '& .MuiFab-primary': {
                bgcolor: selectedFilter === action.filter ? action.color : 'white',
                color: selectedFilter === action.filter ? 'white' : action.color,
                border: `2px solid ${action.color}`,
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                '&:hover': {
                  bgcolor: action.color,
                  color: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease-in-out',
                boxShadow: selectedFilter === action.filter 
                  ? `0 6px 16px ${alpha(action.color, 0.4)}`
                  : `0 4px 12px ${alpha(action.color, 0.2)}`,
              },
              '& .MuiSvgIcon-root': {
                fontSize: isMobile ? '1rem' : '1.25rem'
              }
            }}
          />
        ))}
        
        {selectedFilter && (
          <SpeedDialAction
            icon={<CloseIcon />}
            tooltipTitle="Limpiar filtros"
            onClick={clearFilters}
            sx={{
              '& .MuiFab-primary': {
                bgcolor: theme.palette.grey[100],
                color: theme.palette.grey[600],
                border: `2px solid ${theme.palette.grey[300]}`,
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                '&:hover': {
                  bgcolor: theme.palette.grey[600],
                  color: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease-in-out',
              },
              '& .MuiSvgIcon-root': {
                fontSize: isMobile ? '1rem' : '1.25rem'
              }
            }}
          />
        )}
      </SpeedDial>
    </Box>
  )
}
