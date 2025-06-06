import React, { useState, useCallback } from 'react'
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  Autocomplete,
  TextField,
  Stack,
  Divider,
  Button,
  useTheme,
  alpha,
  Badge,
  Collapse
} from '@mui/material'
import {
  FilterList as FilterIcon,
  LocationOn as LocationIcon,
  Today as TodayIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material'

export const MobileFilters = ({
  municipios = [],
  selectedMunicipio,
  onMunicipioChange,
  showTodayOnly,
  onTodayToggle,
  onClearFilters,
  isVisible = true,
  activeFiltersCount = 0
}) => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)

  const handleMunicipioChange = useCallback((event, newValue) => {
    onMunicipioChange?.(event, newValue)
  }, [onMunicipioChange])

  const handleTodayToggle = useCallback(() => {
    onTodayToggle?.()
  }, [onTodayToggle])

  const handleClearAll = useCallback(() => {
    onClearFilters?.()
  }, [onClearFilters])

  const toggleExpanded = useCallback(() => {
    setExpanded(prev => !prev)
  }, [])

  if (!isVisible) return null

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: '0 0 16px 16px',
        overflow: 'hidden',
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(20px)',
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`
      }}
    >
      {/* Filter Header */}
      <Box
        sx={{
          p: 1.5,
          pb: expanded ? 1 : 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          backgroundColor: expanded ? alpha(theme.palette.primary.main, 0.02) : 'transparent',
          transition: 'background-color 0.2s ease'
        }}
        onClick={toggleExpanded}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge
            badgeContent={activeFiltersCount}
            color='primary'
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.75rem',
                minWidth: 18,
                height: 18
              }
            }}
          >
            <FilterIcon sx={{ color: 'primary.main' }} />
          </Badge>
          <Typography variant='subtitle1' sx={{ fontWeight: 600, color: 'text.primary' }}>
            Filtros
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {activeFiltersCount > 0 && (
            <Button
              size='small'
              startIcon={<ClearIcon sx={{ fontSize: 16 }} />}
              onClick={(e) => {
                e.stopPropagation()
                handleClearAll()
              }}
              sx={{
                fontSize: '0.75rem',
                textTransform: 'none',
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.error.main, 0.08),
                  color: 'error.main'
                }
              }}
            >
              Limpiar
            </Button>
          )}
          <IconButton size='small' sx={{ color: 'text.secondary' }}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Filter Content */}
      <Collapse in={expanded} timeout={300}>
        <Box sx={{ p: 2, pt: 0 }}>
          <Stack spacing={3}>
            {/* Location Filter */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <LocationIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                  Ubicación
                </Typography>
              </Box>

              <Autocomplete
                value={selectedMunicipio}
                onChange={handleMunicipioChange}
                options={municipios}
                getOptionLabel={(option) => option?.label || ''}
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Selecciona un municipio...'
                    variant='outlined'
                    size='small'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        backgroundColor: alpha(theme.palette.common.white, 0.8),
                        '& fieldset': {
                          borderColor: alpha(theme.palette.primary.main, 0.2)
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2
                        }
                      },
                      '& .MuiInputBase-input': {
                        '&::placeholder': {
                          color: alpha(theme.palette.text.primary, 0.6),
                          opacity: 1
                        }
                      }
                    }}
                  />
                )}
                sx={{
                  '& .MuiAutocomplete-popupIndicator': {
                    color: theme.palette.primary.main
                  },
                  '& .MuiAutocomplete-clearIndicator': {
                    color: theme.palette.text.secondary
                  }
                }}
                clearOnEscape
                clearText='Limpiar'
                noOptionsText='No hay opciones'
                openText='Abrir'
              />
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Date Filter */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <TodayIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                  Fecha
                </Typography>
              </Box>

              <Chip
                label='Solo eventos de hoy'
                color={showTodayOnly ? 'primary' : 'default'}
                variant={showTodayOnly ? 'filled' : 'outlined'}
                onClick={handleTodayToggle}
                icon={<TodayIcon sx={{ fontSize: 18 }} />}
                sx={{
                  borderRadius: 3,
                  height: 40,
                  fontSize: '0.875rem',
                  fontWeight: showTodayOnly ? 600 : 500,
                  border: showTodayOnly
                    ? `2px solid ${theme.palette.primary.main}`
                    : `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  backgroundColor: showTodayOnly
                    ? theme.palette.primary.main
                    : alpha(theme.palette.primary.main, 0.02),
                  color: showTodayOnly
                    ? theme.palette.primary.contrastText
                    : theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: showTodayOnly
                      ? theme.palette.primary.dark
                      : alpha(theme.palette.primary.main, 0.08),
                    transform: 'scale(1.02)'
                  },
                  '&:active': {
                    transform: 'scale(0.98)'
                  },
                  transition: 'all 0.2s ease',
                  '& .MuiChip-icon': {
                    color: 'inherit'
                  }
                }}
              />
            </Box>

            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
              <>
                <Divider sx={{ my: 1 }} />
                <Box>
                  <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
                    Filtros activos ({activeFiltersCount})
                  </Typography>
                  <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                    {selectedMunicipio?.value && (
                      <Chip
                        label={selectedMunicipio.label}
                        size='small'
                        onDelete={() => handleMunicipioChange(null, { label: 'Todos', value: '' })}
                        sx={{ borderRadius: 2 }}
                      />
                    )}
                    {showTodayOnly && (
                      <Chip
                        label='Solo hoy'
                        size='small'
                        onDelete={handleTodayToggle}
                        sx={{ borderRadius: 2 }}
                      />
                    )}
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  )
}
