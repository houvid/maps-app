import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './assets/login.css'
import { MapsApps } from './MapsApp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FormsFirebase from './screens/FormFirebase'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AuthProvider } from './context/authContext'
import { Administration } from './screens/Administration'
import { FormNewFeature } from './screens/formNewFeature'
import Charts from './screens/Charts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MapsApps />,
    errorElement: <h1>error</h1>
  },
  {
    path: '/login',
    element: <FormsFirebase />
  },
  {
    path: '/administration',
    element: <Administration />
  },
  {
    path: '/formNewFeature',
    element: <FormNewFeature />
  },
  {
    path: '/charts',
    element: <Charts />
  }
])
// or "const mapboxgl = require('mapbox-gl');"

if (!navigator.geolocation) {
  alert('tu navegador no tiene opción d e geolocalización')
  throw new Error('tu navegador no tiene opción de geol')
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
