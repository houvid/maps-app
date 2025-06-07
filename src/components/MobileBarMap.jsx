import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react'
import {
  Box,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material'
import { PlacesContext } from '../context'
import { ModalContext } from '../context/modal/ModalContext'
import { MobileBottomNavigation } from './MobileBottomNavigation.jsx'
import { MobileEventsList } from './MobileEventsList.jsx'
import { MobileFilters } from './MobileFilters.jsx'

export const MobileBarMap = ({ mapRef, onViewChange }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { eventos, SetPlaces, placesFiltered } = useContext(PlacesContext)
  const { SetEvento } = useContext(ModalContext)

  // States
  const [currentView, setCurrentView] = useState(0) // 0: Map, 1: Events, 2: Filters
  const [eventosFiltered, setEventosFiltered] = useState(eventos)
  const [selectedMunicipio, setSelectedMunicipio] = useState({ label: 'Todos', value: '' })
  const [showTodayOnly, setShowTodayOnly] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' })

  // Constants
  const municipios = [
    { label: 'Todos', value: '' },
    { label: 'Marinilla', value: 'MARINILLA' },
    { label: 'La Ceja', value: 'LA CEJA' },
    { label: 'El Santuario', value: 'EL SANTUARIO' },
    { label: 'El Carmen de Víboral', value: 'EL CARMEN' },
    { label: 'El Peñol', value: 'EL PEÑOL' },
    { label: 'Rionegro', value: 'RIONEGRO' }
  ]

  const municipioCoordinates = useMemo(() => ({
    MARINILLA: [6.17382554743092, -75.33465274285228],
    RIONEGRO: [6.155522715779031, -75.3735477840812],
    'LA CEJA': [6.031335433247932, -75.43162073585653],
    'EL PEÑOL': [6.216673196136062, -75.24352972448737],
    'EL CARMEN': [6.08379451501892, -75.33540014448175],
    'EL SANTUARIO': [6.139423131774998, -75.26560039189918]
  }), [])

  const fechaActual = (() => {
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const dia = String(fecha.getDate()).padStart(2, '0')
    return `${año}-${mes}-${dia}`
  })()

  // Effects
  useEffect(() => {
    // Apply default filter (today onwards) when events change
    const filtered = eventos.filter(evento => {
      const eventoDate = new Date(evento.date)
      const today = new Date(fechaActual)
      return eventoDate >= today
    })
    setEventosFiltered(filtered)
  }, [eventos, fechaActual])

  // Notify parent component when view changes
  useEffect(() => {
    if (onViewChange) {
      onViewChange(currentView)
    }
  }, [currentView, onViewChange])

  // Helper functions
  const flyToUserLocation = useCallback((coordinates, zoom = 15) => {
    if (mapRef.current) {
      mapRef.current.flyTo(coordinates, zoom)
    }
  }, [mapRef])

  const applyFilters = useCallback(() => {
    setIsLoading(true)

    setTimeout(() => {
      let filtered = [...eventos]

      // Always filter events from today onwards (default behavior)
      filtered = filtered.filter(evento => {
        const eventoDate = new Date(evento.date)
        const today = new Date(fechaActual)
        return eventoDate >= today
      })

      // Filter by municipality
      if (selectedMunicipio.value) {
        filtered = filtered.filter(evento => evento.municipio === selectedMunicipio.value)
      }

      // Filter by today only (additional filter)
      if (showTodayOnly) {
        filtered = filtered.filter(evento => evento.date === fechaActual)
      }

      setEventosFiltered(filtered)
      setIsLoading(false)

      // Only show feedback for manual filter actions, not initial load
      if (selectedMunicipio.value || showTodayOnly) {
        const count = filtered.length
        setSnackbar({
          open: true,
          message: count > 0
            ? `Encontrados ${count} evento${count !== 1 ? 's' : ''}`
            : 'No se encontraron eventos con estos filtros',
          severity: count > 0 ? 'success' : 'info'
        })
      }
    }, 300)
  }, [eventos, selectedMunicipio, showTodayOnly, fechaActual])

  // Event handlers
  const handleMunicipioChange = useCallback((event, newValue) => {
    setSelectedMunicipio(newValue || { label: 'Todos', value: '' })

    // Fly to municipality
    if (newValue?.value && municipioCoordinates[newValue.value]) {
      flyToUserLocation(municipioCoordinates[newValue.value], 15)
    }
  }, [flyToUserLocation, municipioCoordinates])

  const handleTodayToggle = useCallback(() => {
    setShowTodayOnly(prev => !prev)
  }, [])

  const handleClearFilters = useCallback(() => {
    setSelectedMunicipio({ label: 'Todos', value: '' })
    setShowTodayOnly(false)
    
    // Apply default filter (today onwards) when clearing filters
    const filtered = eventos.filter(evento => {
      const eventoDate = new Date(evento.date)
      const today = new Date(fechaActual)
      return eventoDate >= today
    })
    setEventosFiltered(filtered)

    setSnackbar({
      open: true,
      message: 'Filtros limpiados',
      severity: 'info'
    })
  }, [eventos, fechaActual])

  const handleEventClick = useCallback((evento) => {
    // Set the event in modal context
    SetEvento(evento)

    // Filter places
    const placesFiltrado = placesFiltered.filter(place =>
      place.geometry.coordinates[0] === evento.coordinates[1]
    )
    SetPlaces(placesFiltrado)

    // Fly to event location
    flyToUserLocation(evento.coordinates, 18)

    // Switch to map view
    setCurrentView(0)

    setSnackbar({
      open: true,
      message: 'Mostrando evento en el mapa',
      severity: 'success'
    })
  }, [SetEvento, SetPlaces, placesFiltered, flyToUserLocation])

  const handleAddEvent = useCallback(() => {
    window.open('https://forms.gle/DDAc9hyc34xxXKRm7', '_blank', 'noopener,noreferrer')
  }, [])

  const handleNavigation = useCallback((viewIndex) => {
    setCurrentView(viewIndex)
  }, [])

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters()
  }, [selectedMunicipio, showTodayOnly, applyFilters])

  // Calculate active filters count
  const activeFiltersCount = (selectedMunicipio.value ? 1 : 0) + (showTodayOnly ? 1 : 0)

  // Don't render on desktop - use original BarMap
  if (!isMobile) {
    return null
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none', // Allow map interactions by default
        zIndex: 1000,
        backgroundColor: 'transparent' // Asegurar que no haya fondo
      }}
    >
      {/* Floating Filters Overlay - Only visible when in events or filters view */}
      {(currentView === 1 || currentView === 2) && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            pointerEvents: 'auto'
          }}
        >
          <MobileFilters
            municipios={municipios}
            selectedMunicipio={selectedMunicipio}
            onMunicipioChange={handleMunicipioChange}
            showTodayOnly={showTodayOnly}
            onTodayToggle={handleTodayToggle}
            onClearFilters={handleClearFilters}
            isVisible
            activeFiltersCount={activeFiltersCount}
          />
        </Box>
      )}

      {/* Events List Overlay - Only visible when currentView is 1 */}
      {currentView === 1 && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 80, // Space for bottom navigation
            backgroundColor: 'background.default',
            zIndex: 1000,
            overflow: 'hidden',
            pointerEvents: 'auto'
          }}
        >
          <Box
            sx={{
              height: '100%',
              overflow: 'auto',
              pt: 8 // Space for filters at top
            }}
          >
            <MobileEventsList
              eventos={eventosFiltered}
              onEventClick={handleEventClick}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      )}

      {/* Bottom Navigation */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          pointerEvents: 'auto'
        }}
      >
        <MobileBottomNavigation
          currentView={currentView}
          onMapView={() => handleNavigation(0)}
          onEventsList={() => handleNavigation(1)}
          onFilters={() => handleNavigation(2)}
          onAddEvent={handleAddEvent}
          eventsCount={eventosFiltered.length}
          activeFiltersCount={activeFiltersCount}
        />
      </Box>

      {/* Snackbar for feedback - Floating overlay */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          position: 'fixed',
          top: currentView === 1 || currentView === 2 ? 140 : 20, // Below filters when in events view
          left: 16,
          right: 16,
          zIndex: 1200, // Above everything else
          pointerEvents: 'none', // Don't block interactions
          '& .MuiSnackbar-root': {
            position: 'static'
          }
        }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant='filled'
          sx={{
            width: '100%',
            borderRadius: 3,
            pointerEvents: 'auto', // Re-enable interactions for the alert itself
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            '& .MuiAlert-icon': {
              fontSize: 18
            },
            '& .MuiAlert-message': {
              fontSize: '0.875rem',
              fontWeight: 500
            },
            '& .MuiAlert-action': {
              padding: 0
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
