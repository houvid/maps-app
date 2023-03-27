import { useReducer } from "react";

import { Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

export interface MapState {
    isMapReady: boolean;
    map?: Map,


}

interface Props {
    children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,

}



export const MapProvider = ({children}: Props ) => {
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)
    const setMap = ( map: Map ) => {
        var coordenadas: [number, number][]  = [
        [-75.24063911311201,6.2164976361890885], // Nueva York
        ];
        const customMarker = document.createElement('div');
        customMarker.style.backgroundImage = 'url(https://cdn-icons-png.flaticon.com/512/10133/10133906.png)';
        customMarker.style.backgroundSize = 'cover';
        customMarker.style.backgroundPosition = 'center';
        customMarker.style.width = '32px';
        customMarker.style.height = '32px';
        const customMarker2 = document.createElement('div');
        customMarker.style.backgroundImage = 'url(https://cdn-icons-png.flaticon.com/512/10133/10133906.png)';
        customMarker.style.backgroundSize = 'cover';
        customMarker.style.backgroundPosition = 'center';
        customMarker.style.width = '32px';
        customMarker.style.height = '32px';
        const myLocationPopup = new Popup()
        .setHTML(
            `<h4> Aquí estoy </h4>
            <img src="https://cdn-icons-png.flaticon.com/512/10133/10133906.png" style="width: 50px;">
            <p> Acá vamos pablito  </p>`)

        const initialMarker = new Marker({
            color: '#61DAFB',
            element: customMarker
        })
        .setLngLat( map.getCenter() )
        .setPopup( myLocationPopup )
        .addTo(map)
        console.log( map.getCenter())

        coordenadas.forEach(function(coordenada: [number,number]) {
        var marker = new Marker({
            element: customMarker2
        })
        .setLngLat(coordenada)
        .addTo(map);
        });
        

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