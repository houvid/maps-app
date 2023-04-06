
import mapboxgl from 'mapbox-gl'
import datos from '../apis//earthquakes.json'
function Clusters (map) {
  map.on('load', () => {
    console.log(datos.features.filter(feature => {
      feature.properties.text_es = 'Marinilla'
    }))
    map.addSource('puntos', {
      type: 'geojson',
      data: datos,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    })

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'puntos',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
        ]
      }
    })

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'puntos',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-size': 12
      }
    })

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'puntos',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#3252a8',
        'circle-radius': 5,
        'circle-stroke-width': 10,
        'circle-stroke-color': '#fff'
      }
    })

    // inspect a cluster on click
    map.on('click', 'clusters', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      })
      const clusterId = features[0].properties.cluster_id
      map.getSource('puntos').getClusterExpansionZoom(
        clusterId,
        (err, zoom) => {
          if (err) return

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom
          })
        }
      )
    })
    map.on('click', 'unclustered-point', (e) => {
      console.log(e.features[0])
      const coordinates = e.features[0].geometry.coordinates.slice()
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
        `
        <div class="">
        <div class="card-body">
        <img src="${e.features[0].properties.image}" class="card-img-top" style="width: 100px; text-align: center; border-radius: 10px;" >
        <h5 class="card-title">${e.features[0].properties.text_es}</h5>
        <p class="card-text">${e.features[0].properties.datos_adicionales}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>`
        )
        .addTo(map)
    })

    map.on('mouseenter', 'clusters', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseenter', 'unclustered-point', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'clusters', () => {
      map.getCanvas().style.cursor = ''
    })
    map.on('mouseleave', 'unclustered-point', () => {
      map.getCanvas().style.cursor = ''
    })
  })

  return map
}
export default Clusters
