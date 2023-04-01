import axios from 'axios'

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: 'pk.eyJ1IjoiaG91dmlkIiwiYSI6ImNsZnBob2lkODBhMjIzeHBvZmlqd3E2ODgifQ.BAKHnn5wTYJUm01JLmgo3g'

  }

})

export default directionsApi
