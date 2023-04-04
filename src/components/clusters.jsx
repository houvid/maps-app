
import mapboxgl from 'mapbox-gl'
import datos from '../apis//earthquakes.json'
function Clusters (map) {
  console.log(datos.features)
  map.on('load', () => {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('puntos', {
      type: 'geojson',
      // Point to GeoJSON data. This example visualizes all M1.0+ puntos
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      data: datos,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    })

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'puntos',
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
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
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    })

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'puntos',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#eb3a34',
        'circle-radius': 10,
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

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', (e) => {
      console.log(e.features[0])
      const coordinates = e.features[0].geometry.coordinates.slice()

      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
        `<div class="card" >
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${e.features[0].text_es}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
