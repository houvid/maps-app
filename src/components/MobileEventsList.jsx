import React, { useState, useContext, useCallback } from 'react'
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Skeleton,
  useTheme,
  alpha,
  Fade,
  CardActionArea,
  Stack
} from '@mui/material'
import {
  LocationOn as LocationIcon,
  Event as EventIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material'
import { PlacesContext } from '../context'
import { ModalContext } from '../context/modal/ModalContext'

export const MobileEventsList = ({ eventos, onEventClick, isLoading = false }) => {
  const theme = useTheme()
  const { SetPlaces, placesFiltered } = useContext(PlacesContext)
  const { SetEvento } = useContext(ModalContext)
  const [favorites, setFavorites] = useState(new Set())
  const [fechaActual] = useState(() => {
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const dia = String(fecha.getDate()).padStart(2, '0')
    return `${año}-${mes}-${dia}`
  })

  const toggleFavorite = useCallback((eventId, e) => {
    e.stopPropagation()
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(eventId)) {
        newFavorites.delete(eventId)
      } else {
        newFavorites.add(eventId)
      }
      return newFavorites
    })
  }, [])

  const handleShare = useCallback((evento, e) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: evento.eventName,
        text: `¡Mira este evento en ${evento.lugar}!`,
        url: window.location.href
      })
    }
  }, [])

  const handleEventClick = useCallback((evento) => {
    SetEvento(evento)
    const placesFiltrado = placesFiltered.filter(place =>
      place.geometry.coordinates[0] === evento.coordinates[1]
    )
    SetPlaces(placesFiltrado)
    onEventClick?.(evento)
  }, [SetEvento, SetPlaces, placesFiltered, onEventClick])

  const isToday = (date) => date === fechaActual
  const isPast = (date) => date < fechaActual

  if (isLoading) {
    return (
      <Box sx={{ p: 3, pt: 1 }}>
        {[...Array(3)].map((_, index) => (
          <Card key={index} sx={{ mb: 2, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', p: 2 }}>
              <Skeleton variant='rectangular' width={80} height={80} sx={{ borderRadius: 2, mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant='text' sx={{ fontSize: '1.2rem', mb: 1 }} />
                <Skeleton variant='text' sx={{ mb: 1 }} />
                <Skeleton variant='text' width='60%' />
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    )
  }

  if (!eventos || eventos.length === 0) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          minHeight: '50vh'
        }}
      >
        <EventIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.5 }} />
        <Typography variant='h6' color='text.secondary'>
          No hay eventos disponibles
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ maxWidth: 300, textAlign: 'center' }}>
          Por ahora no tenemos agenda con estos parámetros. Intenta ajustar los filtros o verifica más tarde.
        </Typography>
      </Box>
    )
  }

  const validEvents = eventos.filter(evento => evento && !isPast(evento.date))

  return (
    <Box 
      sx={{ 
        px: 2, 
        py: 1,
        minHeight: '100%'
      }}
    >
      {/* Events Counter */}
      <Box sx={{ mb: 2, px: 1 }}>
        <Typography variant='body2' color='text.secondary'>
          {validEvents.length} evento{validEvents.length !== 1 ? 's' : ''} encontrado{validEvents.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      <Stack spacing={2}>
        {validEvents.map((evento, index) => (
          <Fade in timeout={300 + index * 100} key={evento.id || index}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`
                },
                position: 'relative',
                backgroundColor: 'background.paper'
              }}
              elevation={2}
            >
              <CardActionArea onClick={() => handleEventClick(evento)}>
                <Box sx={{ display: 'flex', p: 2 }}>
                  {/* Event Image */}
                  {evento.urlImagen && (
                    <CardMedia
                      component='img'
                      sx={{
                        width: 90,
                        height: 90,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mr: 2,
                        flexShrink: 0
                      }}
                      image={evento.urlImagen}
                      alt={evento.eventName}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  )}

                  {/* Event Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                      <Typography
                        variant='subtitle1'
                        sx={{
                          fontWeight: 600,
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          flex: 1,
                          mr: 1
                        }}
                      >
                        {evento.eventName?.charAt(0).toUpperCase() + evento.eventName?.slice(1).toLowerCase()}
                      </Typography>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                        <IconButton
                          size='small'
                          onClick={(e) => toggleFavorite(evento.id || index, e)}
                          sx={{
                            color: favorites.has(evento.id || index) ? 'error.main' : 'action.disabled',
                            p: 0.5,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.error.main, 0.1)
                            }
                          }}
                        >
                          {favorites.has(evento.id || index)
                            ? <FavoriteIcon sx={{ fontSize: 16 }} />
                            : <FavoriteBorderIcon sx={{ fontSize: 16 }} />}
                        </IconButton>
                        <IconButton
                          size='small'
                          onClick={(e) => handleShare(evento, e)}
                          sx={{ 
                            color: 'action.disabled', 
                            p: 0.5,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.1)
                            }
                          }}
                        >
                          <ShareIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 0.5 }}>
                      <LocationIcon sx={{ fontSize: 14, color: 'text.secondary', flexShrink: 0 }} />
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontSize: '0.875rem'
                        }}
                      >
                        {evento.lugar}
                      </Typography>
                    </Box>

                    {/* Date */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <EventIcon sx={{ fontSize: 14, color: 'text.secondary', flexShrink: 0 }} />
                      {isToday(evento.date)
                        ? (
                          <Chip
                            label='¡Hoy!'
                            color='success'
                            size='small'
                            sx={{
                              height: 20,
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              '& .MuiChip-label': { px: 1 }
                            }}
                          />
                          )
                        : (
                          <Typography variant='body2' color='text.secondary' sx={{ fontSize: '0.875rem' }}>
                            {new Date(evento.date).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </Typography>
                          )}
                    </Box>
                  </Box>

                  {/* Today Indicator */}
                  {isToday(evento.date) && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'success.main',
                        boxShadow: `0 0 0 2px ${alpha(theme.palette.success.main, 0.2)}`
                      }}
                    />
                  )}
                </Box>
              </CardActionArea>
            </Card>
          </Fade>
        ))}
      </Stack>

      {/* Bottom spacing for safe area */}
      <Box sx={{ height: 2 }} />
    </Box>
  )
}
