import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MapsApps } from './MapsApp';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiaG91dmlkIiwiYSI6ImNsZm93MG02MDB2dG8zcW1oaHZnMGZ6M28ifQ.8TK8zkz65gEZLauBnKU6OQ';


if (!navigator.geolocation) {
  alert('tu navegador no tiene opción de geolocalización');
  throw new Error ('tu navegador no tiene opción de geol')
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApps/>
  </React.StrictMode>
);

