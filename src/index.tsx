import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MapsApps } from './MapsApp'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiaG91dmlkIiwiYSI6ImNsZnBob2lkODBhMjIzeHBvZmlqd3E2ODgifQ.BAKHnn5wTYJUm01JLmgo3g'

if (!navigator.geolocation) {
  alert('tu navegador no tiene opción de geolocalización')
  throw new Error('tu navegador no tiene opción de geol')
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <MapsApps />
  </React.StrictMode>
)
