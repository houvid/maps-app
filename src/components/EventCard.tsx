import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  IconButton,
  useTheme,
  alpha,
  Avatar
} from '@mui/material'
import {
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Schedule as TimeIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material'

interface EventCardProps {
  evento: {
    eventName: string
    lugar: string
    date: string
    time?: string
    urlImagen: string
    municipio: string
    description?: string
    categoria?: string
  }
  onClick: () => void
  isToday?: boolean
}

export const EventCard: React.FC<EventCardProps> = ({ evento, onClick, isToday = false }) => {
  const theme = useTheme()

  const formatEventName = (name: string) => {
    if (!name) return ''
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }

  const getCategoryColor = (categoria: string) => {
    const colors: { [key: string]: string } = {
      'Cultural': '#E91E63',
      'Deportivo': '#4CAF50',
      'Musical': '#9C27B0',
      'Gastronómico': '#FF9800',
      'Familiar': '#2196F3',
      'Educativo': '#795548'
    }
    return colors[categoria] || theme.palette.primary.main
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        cursor: 'pointer',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`,
          '& .event-image': {
            transform: 'scale(1.05)',
          }
        },
        ...(isToday && {
          border: `2px solid ${theme.palette.success.main}`,
          boxShadow: `0 8px 24px ${alpha(theme.palette.success.main, 0.2)}`
        })
      }}
      onClick={onClick}
    >
      {/* Image Container */}
      <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
        <CardMedia
          component="img"
          image={evento.urlImagen || '/placeholder-event.jpg'}
          alt={evento.eventName}
          className="event-image"
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out'
          }}
        />
        
        {/* Overlay with action buttons */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            gap: 1
          }}
        >
          <IconButton
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.common.white, 0.9),
              '&:hover': {
                bgcolor: theme.palette.common.white,
                transform: 'scale(1.1)'
              }
            }}
            onClick={(e) => {
              e.stopPropagation()
              // Add share functionality
            }}
          >
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.common.white, 0.9),
              '&:hover': {
                bgcolor: theme.palette.common.white,
                color: theme.palette.error.main,
                transform: 'scale(1.1)'
              }
            }}
            onClick={(e) => {
              e.stopPropagation()
              // Add favorite functionality
            }}
          >
            <FavoriteIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Category chip */}
        {evento.categoria && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12
            }}
          >
            <Chip
              label={evento.categoria}
              size="small"
              sx={{
                bgcolor: getCategoryColor(evento.categoria),
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            />
          </Box>
        )}

        {/* Today indicator */}
        {isToday && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12
            }}
          >
            <Chip
              label="¡Hoy!"
              size="small"
              color="success"
              sx={{
                fontWeight: 600,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' }
                }
              }}
            />
          </Box>
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 2.5 }}>
        {/* Event Title */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 1.5,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {formatEventName(evento.eventName)}
        </Typography>

        {/* Location */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            mb: 1,
            color: theme.palette.text.secondary
          }}
        >
          <LocationIcon 
            sx={{ 
              fontSize: 18, 
              mr: 1, 
              mt: 0.1,
              color: theme.palette.primary.main 
            }} 
          />
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              lineHeight: 1.4
            }}
          >
            {evento.lugar}
            {evento.municipio && (
              <Typography
                component="span"
                variant="caption"
                sx={{
                  display: 'block',
                  color: theme.palette.text.disabled,
                  fontWeight: 500
                }}
              >
                {evento.municipio}
              </Typography>
            )}
          </Typography>
        </Box>

        {/* Date and Time */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 1.5
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.text.secondary
            }}
          >
            <CalendarIcon 
              sx={{ 
                fontSize: 18, 
                mr: 0.5,
                color: theme.palette.primary.main 
              }} 
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {formatDate(evento.date)}
            </Typography>
          </Box>

          {evento.time && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.text.secondary
              }}
            >
              <TimeIcon 
                sx={{ 
                  fontSize: 18, 
                  mr: 0.5,
                  color: theme.palette.primary.main 
                }} 
              />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {evento.time}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Description preview */}
        {evento.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.4
            }}
          >
            {evento.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
} 