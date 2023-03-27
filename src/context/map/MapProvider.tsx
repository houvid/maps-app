import { useContext, useEffect, useReducer } from "react";

import { Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "../";

export interface MapState {
    isMapReady: boolean;
    map?: Map,
    markers: Marker[];


}

interface Props {
    children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers:[],

}



export const MapProvider = ({children}: Props ) => {
    const { places } = useContext(PlacesContext);
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)
    useEffect(() => {
        state.markers.forEach(marker => marker.remove())
        const newMarkers: Marker[] = []; 

        for (const place of places) {
            const [ lng, lat ] = place.center;
            const popup = new Popup()
                .setHTML(`
                    <h6>${ place.text_es }</h6>
                    <p>${ place.place_name }</p>
                `)
            const newMarker = new Marker()
                .setPopup(popup)
                .setLngLat([lng, lat])
                .addTo( state.map! );

                newMarkers.push(newMarker);
        }

        dispatch({ type:'setMarkers', payload: newMarkers })

        //TODO: limpiar polyline


    }, [ places ])
    
    const setMap = ( map: Map ) => {

        // const customMarker = document.createElement('div');
        // customMarker.style.backgroundImage = 'url(https://cdn-icons-png.flaticon.com/512/10133/10133906.png)';
        // customMarker.style.backgroundSize = 'cover';
        // customMarker.style.backgroundPosition = 'center';
        // customMarker.style.width = '32px';
        // customMarker.style.height = '32px';
        
        const myLocationPopup = new Popup()
        .setHTML(
            `<h4> Aquí estoy </h4>
            <img src="https://cdn-icons-png.flaticon.com/512/10133/10133906.png" style="width: 50px;">
            <p> Acá vamos pablito  </p>`)

        new Marker({
            color: '#61DAFB',
            //element: customMarker
        })
        .setLngLat( map.getCenter() )
        .setPopup( myLocationPopup )
        .addTo(map)
        console.log( map.getCenter())

        dispatch({ type: 'setMap', payload: map})
        
    }

    return(
        <MapContext.Provider value={{
            ...state,

            //Methods
            setMap,
        }}>
            { children }
        </MapContext.Provider>
    )
}