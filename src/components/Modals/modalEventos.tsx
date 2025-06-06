import React, { useContext, useState } from 'react'
import { ModalContext } from '../../context/modal/ModalContext'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Tabs,
  Tab,

  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
  alpha,
  Slide,
  AppBar,
  Toolbar
} from '@mui/material'
import {
  Close as CloseIcon,
  Schedule as ScheduleIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Phone as PhoneIcon,
  Language as WebIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material'
import { TransitionProps } from '@mui/material/transitions'
// Transición personalizada para el modal
const Transition = React.forwardRef(function Transition (
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel (props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`event-tabpanel-${index}`}
      aria-labelledby={`event-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  )
}

export const ModalEventos = () => {
  const { SetStateModalEvent, evento, stateModalEvent } = useContext(ModalContext)
  const [tabValue, setTabValue] = useState(1) // Empezar en Programación
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const theme = useTheme()
  
  // Preparar array de imágenes (por ahora una, pero expandible)
  const images = evento.urlImagen ? [evento.urlImagen, evento.urlImagen] : []
  const programacionEvento: any = evento.horarioEvento?.split(',') || []

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const closeModal = () => {
    SetStateModalEvent(false)
  }

  return (
    <Dialog
      fullScreen
      open={stateModalEvent}
      onClose={closeModal}
      TransitionComponent={Transition}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: theme.palette.background.default,
          backgroundImage: 'none',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          maxHeight: '100vh'
        }
      }}
    >
      {/* Header con título y botón cerrar */}
      <AppBar 
        position="relative" 
        elevation={0}
        sx={{ 
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ px: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flex: 1, 
              color: 'text.primary',
              fontWeight: 600,
              textAlign: 'center'
            }}
          >
            Detalles del Evento
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeModal}
            sx={{ 
              color: 'text.primary',
              backgroundColor: alpha(theme.palette.common.black, 0.04),
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.black, 0.08)
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent sx={{ p: 0, overflow: 'auto', height: '100%' }}>
        {/* Carousel de imágenes */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '250px',
            backgroundColor: alpha(theme.palette.common.black, 0.02),
            overflow: 'hidden'
          }}
        >
          {images.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                transition: 'transform 0.3s ease-in-out',
                transform: `translateX(-${currentImageIndex * 100}%)`,
                height: '100%'
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`${evento.eventName} - ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
              ))}
            </Box>
          )}
          
          {/* Indicadores de imagen (solo mostrar si hay múltiples) */}
          {images.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1
              }}
            >
              {images.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: index === currentImageIndex 
                      ? 'white' 
                      : alpha('#fff', 0.5),
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Título del evento */}
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Typography 
            variant="h5" 
            component="h1"
            sx={{ 
              fontWeight: 700,
              textAlign: 'center',
              color: 'text.primary',
              lineHeight: 1.3
            }}
          >
            {evento.eventName}
          </Typography>
          
          {/* Fecha y hora chip */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                         <Chip
               icon={<ScheduleIcon />}
               label={evento.date ? String(evento.date) : 'Fecha por confirmar'}
               variant="outlined"
               sx={{
                 borderRadius: 2,
                 '& .MuiChip-icon': {
                   color: theme.palette.primary.main
                 }
               }}
             />
          </Box>
        </Box>

        {/* Tabs de navegación */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                py: 2
              }
            }}
          >
            <Tab
              icon={<ScheduleIcon />}
              label="Programación"
              iconPosition="top"
              value={1}
            />
            <Tab
              icon={<InfoIcon />}
              label="Información"
              iconPosition="top"
              value={0}
            />
            <Tab
              icon={<ContactIcon />}
              label="Contacto"
              iconPosition="top"
              value={2}
            />
          </Tabs>
        </Box>

        {/* Contenido de las tabs */}
        <Box sx={{ px: 3, pb: 10 }}>
          {/* Tab Información */}
          <TabPanel value={tabValue} index={0}>
            <Typography 
              variant="body1" 
              sx={{ 
                lineHeight: 1.6,
                color: 'text.secondary',
                textAlign: 'justify'
              }}
            >
              {evento.description || 'No hay información disponible.'}
            </Typography>
          </TabPanel>

          {/* Tab Programación */}
          <TabPanel value={tabValue} index={1}>
            {programacionEvento.length > 0 ? (
              <List sx={{ py: 0 }}>
                {programacionEvento.map((item: string, index: number) => (
                  <ListItem
                    key={index}
                    sx={{
                      px: 0,
                      py: 1,
                      borderRadius: 2,
                      mb: 1,
                      backgroundColor: alpha(theme.palette.primary.main, 0.02)
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <PlayIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.trim()}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.95rem',
                          fontWeight: 500
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 4,
                  color: 'text.secondary'
                }}
              >
                <ScheduleIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                <Typography variant="body1">
                  No hay programación disponible.
                </Typography>
              </Box>
            )}
          </TabPanel>

          {/* Tab Contacto */}
          <TabPanel value={tabValue} index={2}>
            <List sx={{ py: 0 }}>
              {evento.emailOrg && (
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon>
                    <EmailIcon sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={evento.emailOrg}
                    secondary="Correo electrónico"
                  />
                </ListItem>
              )}
              
              {evento.telefonoOrg && (
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon>
                    <PhoneIcon sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={evento.telefonoOrg}
                    secondary="Teléfono"
                  />
                </ListItem>
              )}
              
              {evento.facebook && (
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon>
                    <FacebookIcon sx={{ color: '#1877f2' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={evento.facebook}
                    secondary="Facebook"
                  />
                </ListItem>
              )}
              
              {evento.instagram && (
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon>
                    <InstagramIcon sx={{ color: '#E4405F' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={evento.instagram}
                    secondary="Instagram"
                  />
                </ListItem>
              )}
              
              {evento.linkWeb && (
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon>
                    <WebIcon sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={evento.linkWeb}
                    secondary="Sitio web"
                  />
                </ListItem>
              )}
            </List>
            
            {!evento.emailOrg && !evento.telefonoOrg && !evento.facebook && 
             !evento.instagram && !evento.linkWeb && (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 4,
                  color: 'text.secondary'
                }}
              >
                <ContactIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                <Typography variant="body1">
                  No hay información de contacto disponible.
                </Typography>
              </Box>
            )}
          </TabPanel>
        </Box>
      </DialogContent>

      {/* Footer con botón cerrar */}
      <DialogActions sx={{ 
        p: 3, 
        pt: 2, 
        position: 'sticky', 
        bottom: 0, 
        backgroundColor: theme.palette.background.default,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
        zIndex: 1
      }}>
        <Button
          onClick={closeModal}
          variant="contained"
          fullWidth
          size="large"
          sx={{
            borderRadius: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

